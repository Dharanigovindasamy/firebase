//using Microsoft.AspNetCore.Mvc;
//using ChatApplication.ChatApplicationService;
//using ChatApplication.Models;


//namespace ChatApplication.Controllers
//{

//    [ApiController]
//    [Route("notification")]
//    public class NotificationController : ControllerBase
//    {
//        private readonly INotificationService _notificationService;

//        public NotificationController(INotificationService notificationService)
//        {
//            _notificationService = notificationService;
//        }

//        [HttpPost("send-notification")]
//        public async Task<IActionResult> SendNotification([FromBody] NotificationRequest request)
//        {
//            if (request == null || string.IsNullOrWhiteSpace(request.Token))
//                return BadRequest("Invalid request");

//            var message = new Message
//            {
//                SenderId = user.Uid, // Replace this with actual sender logic (e.g., from JWT)
//                ReceiverId = user.Uid, // Replace with actual receiver
//                Content = request.Message,
//                CreatedAt = DateTime.UtcNow
//            };

//            await _notificationService.SendNewMessageNotification(message, request.Token);
//            return Ok(new { success = true, message = "Notification sent successfully." });
//        }
//    }

//    public class NotificationRequest
//    {
//        public string Token { get; set; }
//        public string Title { get; set; } // optional
//        public string Message { get; set; }
//        public string Link { get; set; } // optional
//    }

//}
