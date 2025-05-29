using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Google.Apis.Auth.OAuth2;
using System.Net.Http.Headers;
using System.Text;
using AI_Chatbot.Models;

[Route("api/dialogflow")]
[ApiController]
public class DialogflowController : ControllerBase
{
    [HttpPost("send")]
    public async Task<IActionResult> SendMessage([FromBody] UserMessage userMessage)
    {
        try
        {
            string projectId = Environment.GetEnvironmentVariable("projectId");
            string sessionId = Guid.NewGuid().ToString();
            string languageCode = "en";
          //  string serviceAccountPath = @"C:\\Users\\dharani.govindhasamy\\sample_task\\AI chatbot\\chataibot-461307-07230f5aa18b.json";
          string serviceAccountPath = Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS");

            GoogleCredential credential = GoogleCredential
                .FromFile(serviceAccountPath)
                .CreateScoped("https://www.googleapis.com/auth/cloud-platform");

            string token = await credential.UnderlyingCredential.GetAccessTokenForRequestAsync();

            string url = $"https://dialogflow.googleapis.com/v2/projects/{projectId}/agent/sessions/{sessionId}:detectIntent";

            var requestBody = new
            {
                queryInput = new
                {
                    text = new
                    {
                        text = userMessage.UserInput,
                        languageCode = languageCode
                    }
                }
            };

            string jsonRequest = Newtonsoft.Json.JsonConvert.SerializeObject(requestBody);

            using HttpClient httpClient = new();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await httpClient.PostAsync(url, content);
            string jsonResponse = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, $"Dialogflow request failed. Response: {jsonResponse}");

            JObject obj = JObject.Parse(jsonResponse);
            string fulfillmentText = obj["queryResult"]?["fulfillmentText"]?.ToString();

            return Ok(fulfillmentText);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error: {ex.Message}");
        }
    }

}
