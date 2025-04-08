using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

[ApiController]
[Route("api/chatApp")]
public class ChatController : ControllerBase
{
    private static Dictionary<string, string> userTokens = new Dictionary<string, string>();

    [HttpPost("saveToken")]
    public IActionResult SaveToken([FromBody] FcmTokenRequest request)
    {
        if (string.IsNullOrEmpty(request.Uid) || string.IsNullOrEmpty(request.Token))
        {
            return BadRequest("Invalid token data");
        }

        userTokens[request.Uid] = request.Token;
        return Ok(new { message = "Token saved successfully" });
    }
}

public class FcmTokenRequest
{
    public string Uid { get; set; }
    public string Token { get; set; }
}
