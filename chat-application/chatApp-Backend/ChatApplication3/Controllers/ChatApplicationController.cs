using ChatApplication.ChatApplicationService;
using ChatApplication.Data;
using ChatApplication.Features;
using ChatApplication.Features.Contacts.Queries;
using ChatApplication.Features.Messages.Mutations;
using ChatApplication.Models;
using ChatApplication.Services;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;


namespace ChatApplication.Controllers
{
    [Route("api/chatApp")]
    [ApiController]
    public class ChatApplicationController : ControllerBase
    {
        private readonly ILogger<ChatApplicationController> _logger;
        private readonly LoginUser _loginUser;
        private readonly ChatService _chatService;
        private readonly FirebaseService _firebaseService;
        private readonly INotificationService _notificationService;

        public string Uid { get; private set; }

        public ChatApplicationController(ILogger<ChatApplicationController> logger, LoginUser loginUser, ChatService chatService, FirebaseService firebaseService,  INotificationService notificationService)
        {
            _logger = logger;
            _loginUser = loginUser;
            _chatService = chatService;
            _firebaseService = firebaseService;
            _notificationService = notificationService;
        }

        [HttpPost("auth")]
        public async Task<IActionResult> LoginAuthenticate(LoginDto userLogin)
        {
            var user = await _loginUser.loginAsyncAuthenticate(userLogin.Uid, userLogin.UserEmail, userLogin.UserName);
            Console.WriteLine(user);
            if (user == null)
            {
                return Unauthorized("Invalid email or password");
            }

            return Ok(new { Uid = user.Uid, UserName = user.UserName , UserEmail = user.UserEmail});
        }

        [HttpGet("conversation")]
        public async Task<IActionResult> GetConversation(string senderId, string receiverId)
        {
            var messages = await _chatService.GetMessagesBetweenUsers(senderId, receiverId);
            Console.WriteLine($"{messages.Count} messages");

            if (messages == null || !messages.Any())
            {
                return NotFound("No conversation found between the users.");
            }

            Console.WriteLine("Messages between the users:");
            foreach (var message in messages)
            {
                Console.WriteLine($"Message ID: {message.Id}, Text: {message.Content}, CreatedAt: {message.CreatedAt}");
            }

            return Ok(messages);
        }

        [HttpGet("contact/user/{uid}")]
        public async Task<IActionResult> GetContactByUid(IMediator mediator, string uid)
        {
            var contacts = await mediator.Send(new GetContactByUid.GetContactByUidRequest { OwnerId = uid });

            foreach (var contact in contacts)
            {
                Console.WriteLine(contact);
            }
            return Ok(contacts);

        }

        [HttpPost("updateFcmToken")]
        public async Task<IActionResult> UpdateFcmToken(string userId, string fcmToken)
        {
            bool updated = await _chatService.UpdateFcmTokenAsync(userId, fcmToken);
            if (!updated) return NotFound("User not found.");

            return Ok("FCM Token updated successfully.");
        }

        [HttpPost("send-notification")]
        public async Task<IActionResult> SendNotification([FromBody] NotificationRequest request)
        {
            try
            {
                _logger.LogInformation($"Token: {request.Token}");
                _logger.LogInformation($"SenderId: {request.SenderId}, ReceiverId: {request.ReceiverId}");

                var response = await _firebaseService.SendPushNotification(
                    request.Token, request.Title, request.Message, request.MessageId);

                return Ok(new { success = true, message = "Notification sent successfully.", firebaseResponse = response });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to send notification: {ex.Message}");
                return StatusCode(500, "Internal server error while sending notification.");
            }
        }

        public class NotificationRequest
        {
            public string Token { get; set; }
            public string Title { get; set; }
            public string Message { get; set; }
            public string MessageId { get; set; } 
            public string SenderId { get; set; }
            public string ReceiverId { get; set; }
        }
    }
}
