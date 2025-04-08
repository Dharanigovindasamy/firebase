using ChatApplication.ChatApplicationService;
using ChatApplication.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace ChatApplication.Controllers
{
    [ApiController]
    [Route("api/messages")]
    public class MessageController : ControllerBase
    {
        private readonly MessageService _messageService;
        private readonly ILogger<MessageController> _logger;

        public MessageController(
            MessageService messageService,
            ILogger<MessageController> logger)
        {
            _messageService = messageService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] Message message)
        {
            try
            {
                var result = await _messageService.SendMessage(message);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error in SendMessage: {ex.Message}");
                return StatusCode(500, "An error occurred while sending the message");
            }
        }
    }
}
