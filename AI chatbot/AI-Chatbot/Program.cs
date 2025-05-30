using Google.Apis.Auth.OAuth2;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using AI_Chatbot.Data;
using AI_Chatbot.Data.Models;
using AI_Chatbot.Data.Configuration;
using System;


namespace AI_Chatbot
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllersWithViews();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            builder.Services.AddDbContext<AppDbContext>(options =>
              options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            var app = builder.Build();

            if (!app.Environment.IsDevelopment())
            {
                app.UseHsts();
            }
            app.UseCors("AllowAll");
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllers();
            Console.WriteLine(System.IO.File.Exists(Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS")));
            app.Run();
        }
    }
}


//using Google.Apis.Auth.OAuth2;
//using Newtonsoft.Json.Linq;
//using System.Net.Http.Headers;
//using System.Text;

//class Program
//{
//    static async Task Main(string[] args)
//    {
//        string projectId = "chataibot-461307";
//        string sessionId = Guid.NewGuid().ToString();
//        string languageCode = "en";
//        string userMessage = "Hellosdaaaasdddddddddddddd";

//        string serviceAccountPath = @"C:\\Users\\dharani.govindhasamy\\sample_task\\AI chatbot\\chataibot-461307-07230f5aa18b.json";

//        // Load the credentials
//        GoogleCredential credential = GoogleCredential
//            .FromFile(serviceAccountPath)
//            .CreateScoped("https://www.googleapis.com/auth/cloud-platform");

//        string token = await credential.UnderlyingCredential.GetAccessTokenForRequestAsync();

//        // ✅ Dialogflow ES v2 endpoint (no billing needed)
//        string url = $"https://dialogflow.googleapis.com/v2/projects/{projectId}/agent/sessions/{sessionId}:detectIntent";

//            Console.WriteLine($"Using service account: {serviceAccountPath}, url : {url}");
//        // JSON body
//        var requestBody = new
//        {
//            queryInput = new
//            {
//                text = new
//                {
//                    text = userMessage,
//                    languageCode = languageCode
//                }
//            }
//        };

//        string jsonRequest = Newtonsoft.Json.JsonConvert.SerializeObject(requestBody);

//        using HttpClient httpClient = new();
//        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
//        httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

//        var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");

//        Console.WriteLine("Sending request to Dialogflow ES...");
//        HttpResponseMessage response = await httpClient.PostAsync(url, content);

//        string jsonResponse = await response.Content.ReadAsStringAsync();

//        Console.WriteLine($"\n✅ HTTP Status: {response.StatusCode}");
//        Console.WriteLine("✅ JSON Response:");
//        Console.WriteLine(jsonResponse);

//        if (response.IsSuccessStatusCode)
//        {
//            JObject obj = JObject.Parse(jsonResponse);
//            var fulfillmentText = obj["queryResult"]?["fulfillmentText"]?.ToString();
//            Console.WriteLine($"\n🧠 Bot Response: {fulfillmentText}");
//        }
//        else
//        {
//            Console.WriteLine("❌ ERROR occurred while calling Dialogflow ES.");
//        }
//    }
//}
