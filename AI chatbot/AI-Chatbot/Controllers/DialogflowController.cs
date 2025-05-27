using AI_Chatbot.Models;
using Google.Cloud.Dialogflow.V2;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AI_Chatbot.Controllers
{
    [Route("api/dialogflow")]
    [ApiController]
    public class DialogflowController : ControllerBase
    {

       // Console.WriteLine(Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS"));

        [HttpPost("send")]
        public async Task<IActionResult> SendToDialogflow([FromBody] UserMessage input)
        {
            if (input == null || string.IsNullOrWhiteSpace(input.UserInput))
            {
                return BadRequest("UserInput is required.");
            }

            var sessionId = Guid.NewGuid().ToString();
            var projectId = "plannerbot-fy9n"; 

            var client = await SessionsClient.CreateAsync();

            var request = new DetectIntentRequest
            {
                SessionAsSessionName = SessionName.FromProjectSession(projectId, sessionId),
                QueryInput = new QueryInput
                {
                    Text = new TextInput
                    {
                        Text = input.UserInput,
                        LanguageCode = "en"
                    }
                }
            };

            var response = await client.DetectIntentAsync(request);

            var result = new
            {
                Reply = response.QueryResult.FulfillmentText,
                Intent = response.QueryResult.Intent.DisplayName,
                Confidence = response.QueryResult.IntentDetectionConfidence
            };
           // Console.WriteLine(environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS"));

            return Ok(result);
        }
    }
}
