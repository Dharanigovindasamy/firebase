
using ChatApplication.Data;
using ChatApplication.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace ChatApplication.ChatApplicationService
{
    public class MessageService
    {
        private readonly ChatAppContext _context;
        private readonly IFirebaseService _firebaseService;
        private readonly ILogger<MessageService> _logger;

        public MessageService(
            ChatAppContext context,
            IFirebaseService firebaseService,
            ILogger<MessageService> logger)
        {
            _context = context;
            _firebaseService = firebaseService;
            _logger = logger;
        }

        public async Task<Message> SendMessage(Message message)
        {
            try
            {
                _context.Messages.Add(message);
                await _context.SaveChangesAsync();

                var receiver = await _context.Users
                    .FirstOrDefaultAsync(u => u.Uid == message.ReceiverId);

                if (receiver?.DeviceToken != null)
                {
                      var sender = await _context.Users
                        .FirstOrDefaultAsync(u => u.Uid == message.SenderId);

                    string title = $"New message from {sender?.UserName ?? "Someone"}";
                    string body = message.Content.Length > 100 ? 
                        message.Content.Substring(0, 97) + "..." : 
                        message.Content;
                        
                    await _firebaseService.SendPushNotification(
                        receiver.DeviceToken,
                        "New Message",
                        message.Content,
                        message.Id.ToString()
                    );
                }

                return message;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error sending message: {ex.Message}");
                throw;
            }
        }
    }
}
