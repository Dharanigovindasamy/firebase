using ChatApplication.Data;
using ChatApplication.Services;
using Microsoft.EntityFrameworkCore;
using System.Net.WebSockets;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using System.Text.Json;
using ChatApplication.Features.Messages.Mutations;
using ChatApplication.GraphQL.Features.Mutations;  // For Mutation
using ChatApplication.GraphQL.Features.Queries;    // For Query
using ChatApplication.Services;
using ChatApplication.Features;
using MediatR;
using ChatApplication.Features.Messages.Mutations;
using ChatApplication.ChatApplicationService;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials());
});

var connectionString = "Host=localhost;Port=5432;Database=UserApplication;Username=postgres;Password=Rohi@123";
builder.Services.AddDbContextFactory<ChatAppContext>(options =>
   options.UseNpgsql(connectionString));

builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));
builder.Services.AddScoped<ChatService>();
builder.Services.AddScoped<LoginUser>();
//builder.Services.AddSingleton<FirebaseService>(); // 🔹 Register Firebase service
builder.Services.AddScoped<INotificationService, NotificationService>();
//builder.Services.AddScoped<IFirebaseService, FirebaseService>();
builder.Services.AddScoped<FirebaseService>();
builder.Services.AddScoped<IFirebaseService, FirebaseService>();



// Add GraphQL Service
builder.Services.AddGraphQLServer()
    .AddMutationType<Mutation>()
    .AddQueryType<Query>();

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowSpecificOrigin");
app.UseAuthorization();
app.MapControllers();

// WebSocket Configuration
app.UseWebSockets(new WebSocketOptions
{
    KeepAliveInterval = TimeSpan.FromMinutes(2)
});

app.Map("/ws", async context =>
{
    if (context.WebSockets.IsWebSocketRequest)
    {
        using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
        await HandleWebSocketMessages(context, webSocket, app.Services);
    }
    else
    {
        context.Response.StatusCode = 400;
    }
});

app.Run();

static async Task HandleWebSocketMessages(HttpContext context, WebSocket webSocket, IServiceProvider services)
{
    var buffer = new byte[1024 * 4];
    var serviceScope = services.CreateScope();
    var chatService = serviceScope.ServiceProvider.GetRequiredService<ChatService>();

    WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

    while (!result.CloseStatus.HasValue)
    {
        var receivedMessage = Encoding.UTF8.GetString(buffer, 0, result.Count);
        var messageRequest = JsonSerializer.Deserialize<CreateMessage.CreateMessageRequest>(receivedMessage);

      //  var savedMessage = await chatService.SaveMessageAsync(messageRequest);

      //  var savedMessage = await mediator.Send(messageRequest);

        var conversation = await chatService.GetMessagesBetweenUsers(messageRequest.SenderId, messageRequest.ReceiverId);
        var conversationJson = JsonSerializer.Serialize(conversation);
        var encodedMessages = Encoding.UTF8.GetBytes(conversationJson);

        await webSocket.SendAsync(new ArraySegment<byte>(encodedMessages), WebSocketMessageType.Text, true, CancellationToken.None);

        result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
    }

    await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
}
