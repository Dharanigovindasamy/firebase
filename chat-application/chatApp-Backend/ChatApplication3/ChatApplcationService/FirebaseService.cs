using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using Google.Apis.Auth.OAuth2;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ChatApplication.ChatApplicationService
{
    public interface IFirebaseService
    {
        Task<string> SendPushNotification(string token, string title, string body, string messageId);
    }

    public class FirebaseService : IFirebaseService
    {
        private readonly ILogger<FirebaseService> _logger;
        private readonly FirebaseMessaging _firebaseMessaging;
        private readonly IConfiguration _configuration;

        public FirebaseService(ILogger<FirebaseService> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            InitializeFirebase();
            _firebaseMessaging = FirebaseMessaging.DefaultInstance;
        }

        private void InitializeFirebase()
        {
            try
            {
                if (FirebaseApp.DefaultInstance == null)
                {
                    string credentialPath = _configuration["Firebase:CredentialPath"];
                    if (string.IsNullOrEmpty(credentialPath))
                    {
                        throw new ArgumentNullException("Firebase:CredentialPath", "Firebase credential path is not configured in appsettings.json");
                    }

                    GoogleCredential credential = GoogleCredential.FromFile(credentialPath);
                    FirebaseApp.Create(new AppOptions() { Credential = credential });

                    _logger.LogInformation("Firebase initialized successfully");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to initialize Firebase: {ex.Message}");
                throw;
            }
        }

        public async Task<string> SendPushNotification(string token, string title, string body, string messageId)
        {
            try
            {
                var message = new Message
                {
                    Token = token,
                    Notification = new Notification
                    {
                        Title = title,
                        Body = body
                    },
                    Data = new Dictionary<string, string>
                    {
                        { "messageId", messageId }  
                    }
                };

                string response = await _firebaseMessaging.SendAsync(message);
                _logger.LogInformation($"Notification sent successfully. Response: {response}");
                return response;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error sending notification: {ex.Message}");
                throw;
            }
        }
    }
}
