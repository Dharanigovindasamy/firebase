using ChatApplication.ChatApplicationService;
using ChatApplication.Data;
using ChatApplication.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatApplication.Services
{
    public class ChatService
    {
        private readonly ChatAppContext _dbContext;
        private readonly FirebaseService _firebaseService;

        public ChatService(ChatAppContext dbContext, FirebaseService firebaseService)
        {
            _dbContext = dbContext;
            _firebaseService = firebaseService;
        }

        public async Task<List<Message>> GetMessagesBetweenUsers(string senderId, string receiverId)
        {
            return await _dbContext.Messages
                .Where(m => (m.SenderId == senderId && m.ReceiverId == receiverId) ||
                            (m.SenderId == receiverId && m.ReceiverId == senderId))
                .OrderBy(m => m.CreatedAt)
                .ToListAsync();
        }

        public async Task<Message> SaveMessageAsync(Message message)
        {
            await _dbContext.Messages.AddAsync(message);
            await _dbContext.SaveChangesAsync();

            var recipient = await _dbContext.Users.FindAsync(message.ReceiverId);
            if (recipient != null && !string.IsNullOrEmpty(recipient.FcmToken))
            {
                _firebaseService.SendPushNotification(
                    recipient.FcmToken,
                    "New Message",
                    message.Content,
                    message.Id.ToString()
                );
            }

            return message;
        }

        public async Task<bool> UpdateFcmTokenAsync(string userId, string fcmToken)
        {
            var user = await _dbContext.Users.FindAsync(userId);
            if (user == null) return false;

            user.FcmToken = fcmToken;
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}