using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using MediatR;
using ChatApplication.Data;
using System.Net.WebSockets;
using System.Text.Json.Serialization;
using ChatApplication.Features;
using ChatApplication.Services;                   
using ChatApplication.Features.Messages.Mutations;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;


using Microsoft.AspNetCore.Hosting;
using ChatApplication.ChatApplicationService;
using ChatApplication.Controllers;

namespace ChatApplication
{
    public class Startup
    {

        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin", builder =>
                    builder.WithOrigins("http://localhost:3000") // Your frontend URL
                           .AllowAnyMethod()
                           .AllowAnyHeader()
                           .AllowCredentials());
            });

            var firebaseApp = FirebaseApp.Create(new AppOptions
            {
                Credential = GoogleCredential.FromFile("file:///C:/Users/dharani.govindhasamy/sample_task/Firebase/chat-application/chatApp-Backend/ChatApplication3/chatapplication-63d14-firebase-adminsdk-fbsvc-1f52c9ff8f.json")
               
            });

            services.AddMediatR(typeof(Startup).Assembly);
            services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
                    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
                    options.JsonSerializerOptions.WriteIndented = true;
                    options.JsonSerializerOptions.MaxDepth = 10;
                });

            services.AddDbContext<ChatAppContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<LoginUser>();  
            services.AddScoped<ChatService>();
    services.AddScoped<INotificationService, NotificationService>();
    services.AddScoped<MessageService>();
       // services.AddHostedService<NotificationRetryService>();
            services.AddScoped<ChatApplicationController>();
            services.AddSingleton<IFirebaseService, FirebaseService>();

            services.AddLogging(builder =>
    {
        builder.AddConsole();
        builder.AddDebug();
    });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors("AllowSpecificOrigin");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapGraphQL();
            });
        }
    }
}
