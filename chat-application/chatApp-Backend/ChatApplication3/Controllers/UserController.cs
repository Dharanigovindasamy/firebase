//using Microsoft.AspNetCore.Mvc;
//using System.Threading.Tasks;

//[ApiController]
//[Route("api/user")]
//public class UserController : ControllerBase
//{
//    private readonly IUserService _userService;

//    public UserController(IUserService userService)
//    {
//        _userService = userService;
//    }

//    [HttpPost("save-fcm-token")]
//    public async Task<IActionResult> SaveFcmToken([FromBody] FcmTokenRequest request)
//    {
//        await _userService.SaveUserFcmToken(request.UserId, request.FcmToken);
//        return Ok(new { message = "FCM Token saved successfully" });
//    }
//}

//public class FcmTokenRequest
//{
//    public string UserId { get; set; }
//    public string FcmToken { get; set; }
//}
//namespace ChatApplication.Controllers
//{
//    public class UserController
//    {
//    }
//}

using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using ChatApplication.Models;
using ChatApplication.Data;
using Microsoft.Extensions.Logging;
using System;
using Microsoft.EntityFrameworkCore;

namespace ChatApplication.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class UserController : ControllerBase
    {
        private readonly ChatAppContext _context;
        private readonly ILogger<UserController> _logger;

        public UserController(ChatAppContext context, ILogger<UserController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // Your existing SaveFcmToken endpoint
        [HttpPost("save-fcm-token")]
        public async Task<IActionResult> SaveFcmToken([FromBody] FcmTokenRequest request)
        {
            try
            {
                var user = await _context.Users.FindAsync(request.UserId);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                user.DeviceToken = request.FcmToken;
                await _context.SaveChangesAsync();

                return Ok(new { message = "FCM Token saved successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error saving FCM token: {ex.Message}");
                return StatusCode(500, "An error occurred while saving the FCM token");
            }
        }

        [HttpPut("{uid}/webpushtoken")]
        public async Task<IActionResult> UpdateWebPushToken(string uid, [FromBody] WebPushTokenRequest request)
        {
            try
            {
                var user = await _context.Users.FindAsync(uid);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                user.WebPushToken = request.WebPushToken;
                await _context.SaveChangesAsync();

                return Ok(new { message = "Web Push Token updated successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error updating web push token: {ex.Message}");
                return StatusCode(500, "An error occurred while updating the web push token");
            }
        }

        [HttpGet("{uid}/tokens")]
        public async Task<IActionResult> GetUserTokens(string userId)
        {
            try
            {
                var user = await _context.Users
                    .Select(u => new { u.Uid, u.DeviceToken, u.WebPushToken })
                    .FirstOrDefaultAsync(u => u.Uid == userId);

                if (user == null)
                {
                    return NotFound("User not found");
                }

                return Ok(new
                {
                    userId = user.Uid,
                    fcmToken = user.DeviceToken,
                    webPushToken = user.WebPushToken
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving user tokens: {ex.Message}");
                return StatusCode(500, "An error occurred while retrieving the user tokens");
            }
        }

        // Delete web push token
        [HttpDelete("{userId}/webpushtoken")]
        public async Task<IActionResult> DeleteWebPushToken(string userId)
        {
            try
            {
                var user = await _context.Users.FindAsync(userId);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                user.WebPushToken = null;
                await _context.SaveChangesAsync();

                return Ok(new { message = "Web Push Token deleted successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting web push token: {ex.Message}");
                return StatusCode(500, "An error occurred while deleting the web push token");
            }
        }
    }

    // Your existing FcmTokenRequest class
    public class FcmTokenRequest
    {
        public string UserId { get; set; }
        public string FcmToken { get; set; }
    }

    // New WebPushTokenRequest class
    public class WebPushTokenRequest
    {
        public string WebPushToken { get; set; }
    }
}
