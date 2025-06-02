using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Google.Apis.Auth.OAuth2;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using AI_Chatbot.Data;
using AI_Chatbot.Data.Models;
using AI_Chatbot.Data.Configuration;
using Newtonsoft.Json;

//[Route("api/dialogflow")]
//[ApiController]
//public class DialogflowController : ControllerBase
//{
//[HttpPost("send")]
//public async Task<IActionResult> SendMessage([FromBody] UserMessage userMessage)
//{
//    try
//    {
//        string projectId = Environment.GetEnvironmentVariable("projectId");
//        string sessionId = Guid.NewGuid().ToString();
//        string languageCode = "en";
//      string serviceAccountPath = Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS");

//        GoogleCredential credential = GoogleCredential
//            .FromFile(serviceAccountPath)
//            .CreateScoped("https://www.googleapis.com/auth/cloud-platform");

//        string token = await credential.UnderlyingCredential.GetAccessTokenForRequestAsync();

//        string url = $"https://dialogflow.googleapis.com/v2/projects/{projectId}/agent/sessions/{sessionId}:detectIntent";

//        var requestBody = new
//        {
//            queryInput = new
//            {
//                text = new
//                {
//                    text = userMessage.UserInput,
//                    languageCode = languageCode
//                }
//            }
//        };

//        string jsonRequest = Newtonsoft.Json.JsonConvert.SerializeObject(requestBody);

//        using HttpClient httpClient = new();
//        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
//        httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

//        var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");
//        HttpResponseMessage response = await httpClient.PostAsync(url, content);
//        string jsonResponse = await response.Content.ReadAsStringAsync();

//        if (!response.IsSuccessStatusCode)
//            return StatusCode((int)response.StatusCode, $"Dialogflow request failed. Response: {jsonResponse}");

//        JObject obj = JObject.Parse(jsonResponse);
//        string fulfillmentText = obj["queryResult"]?["fulfillmentText"]?.ToString();

//        return Ok(fulfillmentText);
//    }
//    catch (Exception ex)
//    {
//        return StatusCode(500, $"Error: {ex.Message}");
//    }
//}



//[HttpPost("send")]
//public async Task<IActionResult> SendMessage([FromBody] UserMessage userMessage)
//{
//    try
//    {
//        string projectId = Environment.GetEnvironmentVariable("projectId");
//        string sessionId = Guid.NewGuid().ToString();
//        string languageCode = "en";
//        string serviceAccountPath = Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS");

//        GoogleCredential credential = GoogleCredential
//            .FromFile(serviceAccountPath)
//            .CreateScoped("https://www.googleapis.com/auth/cloud-platform");

//        string token = await credential.UnderlyingCredential.GetAccessTokenForRequestAsync();

//        string url = $"https://dialogflow.googleapis.com/v2/projects/{projectId}/agent/sessions/{sessionId}:detectIntent";

//        var requestBody = new
//        {
//            queryInput = new
//            {
//                text = new
//                {
//                    text = userMessage.UserInput,
//                    languageCode = languageCode
//                }
//            }
//        };

//        string jsonRequest = Newtonsoft.Json.JsonConvert.SerializeObject(requestBody);

//        using HttpClient httpClient = new();
//        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
//        httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

//        var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");
//        HttpResponseMessage response = await httpClient.PostAsync(url, content);
//        string jsonResponse = await response.Content.ReadAsStringAsync();

//        if (!response.IsSuccessStatusCode)
//            return StatusCode((int)response.StatusCode, $"Dialogflow request failed. Response: {jsonResponse}");

//        JObject obj = JObject.Parse(jsonResponse);
//        string fulfillmentText = obj["queryResult"]?["fulfillmentText"]?.ToString();
//        string intentName = obj["queryResult"]?["intent"]?["displayName"]?.ToString();

//        // Schedule logic
//        if (intentName == "ScheduleIntent")
//        {
//            string task = obj["queryResult"]?["parameters"]?["task"]?.ToString();
//            string dateTime = obj["queryResult"]?["parameters"]?["date-time"]?.ToString();

//            var schedule = new SchedulePlan
//            {
//                Task = task,
//                DateTime = DateTime.Parse(dateTime),
//                UserMessage = userMessage.UserInput
//            };

//            await _dbContext.SchedulePlan.AddAsync(schedule);
//            await _dbContext.SaveChangesAsync();

//            fulfillmentText += $"\n\n✅ Your task \"{task}\" is scheduled for {dateTime}.";
//        }



//        return Ok(fulfillmentText);
//    }
//    catch (Exception ex)
//    {
//        return StatusCode(500, $"Error: {ex.Message}");
//    }
//}



[Route("api/dialogflow")]
[ApiController]
public class DialogflowController : ControllerBase
{
    private readonly AppDbContext _dbContext;

    public DialogflowController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendMessage([FromBody] UserMessage userMessage)
    {
        try
        {
            string projectId = Environment.GetEnvironmentVariable("projectId");
            string sessionId = Guid.NewGuid().ToString();
            string languageCode = "en";
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

            string jsonRequest = JsonConvert.SerializeObject(requestBody);

            using HttpClient httpClient = new();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            var content = new StringContent(jsonRequest, Encoding.UTF8, "application/json");
            HttpResponseMessage response = await httpClient.PostAsync(url, content);
            string jsonResponse = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, $"Dialogflow request failed: {jsonResponse}");

            JObject result = JObject.Parse(jsonResponse);
            string fulfillmentText = result["queryResult"]?["fulfillmentText"]?.ToString();
            string intentName = result["queryResult"]?["intent"]?["displayName"]?.ToString();
            var parameters = result["queryResult"]?["parameters"];

            string wakeUpTimeStr = parameters?["wakeuptime"]?.ToString();
            string work = parameters?["work"]?.ToString();
            string workTimeStr = parameters?["worktime"]?.ToString();
            string hobby = parameters?["hobby"]?.ToString();
            string dateTime = parameters?["date-time"]?.ToString();
            string durationStr = parameters?["duration"]?.ToString();

            if (intentName == "Free time")
            {
                // Parse wake up time
                DateTime wakeUpTimeParsed = DateTime.TryParse(wakeUpTimeStr, out var wakeUpTemp)
                    ? wakeUpTemp
                    : DateTime.Today.AddHours(7);

                // Fixed breakfast and dinner time
                DateTime breakfastTime = DateTime.Today.AddHours(8);  // 8:00 AM
                DateTime dinnerTime = DateTime.Today.AddHours(20);   // 8:00 PM

                // Parse work start time
                DateTime workStart = DateTime.TryParse(workTimeStr, out var workStartTemp)
                    ? workStartTemp
                    : wakeUpTimeParsed.AddHours(2);

                // Parse durations
                TimeSpan? workDurationParsed = TimeSpan.TryParse(durationStr, out var workDurTemp)
                    ? workDurTemp
                    : TimeSpan.FromHours(8);

                TimeSpan? hobbyDurationParsed = TimeSpan.TryParse(durationStr, out var hobbyDurTemp)
                    ? hobbyDurTemp
                    : TimeSpan.FromHours(1);

                // Calculate other times
                DateTime workTimeStart = workStart;
                DateTime workTimeEnd = workTimeStart.Add(workDurationParsed ?? TimeSpan.FromHours(8));

                DateTime hobbyStart = workTimeEnd.AddMinutes(30);
                DateTime hobbyEnd = hobbyStart.Add(hobbyDurationParsed ?? TimeSpan.FromHours(1));

                DateTime readingStart = hobbyEnd.AddMinutes(30);
                DateTime readingEnd = readingStart.AddHours(1);

                // Save to database
                var schedule = new SchedulePlan
                {
                    WakeUpTime = wakeUpTimeParsed.ToUniversalTime().ToString("HH:mm"), // Ensure it's UTC
                    Work = work ?? "Work",
                    WorkTime = $"{workTimeStart.ToUniversalTime():hh\\:mm tt} - {workTimeEnd.ToUniversalTime():hh\\:mm tt}", // Force UTC
                    Task = hobby ?? "Relaxing",
                    DateTime = DateTime.UtcNow, // This is fine
                    Duration = hobbyDurationParsed?.ToString() ?? "01:00:00",
                    UserMessage = userMessage.UserInput
                };

                await _dbContext.SchedulePlan.AddAsync(schedule);
                await _dbContext.SaveChangesAsync();

                // Compose final response
                fulfillmentText = $@"
📝 Here is your personalized schedule for today:

⏰ {wakeUpTimeParsed:hh:mm tt}: Wake up  
🍽 {breakfastTime:hh:mm tt}: Breakfast  
💼 {workTimeStart:hh:mm tt} - {workTimeEnd:hh:mm tt}: {work ?? "Work"}  
🏃 {hobbyStart:hh:mm tt} - {hobbyEnd:hh:mm tt}: {hobby ?? "Jogging"}  
📖 {readingStart:hh:mm tt} - {readingEnd:hh:mm tt}: Reading  
🍲 {dinnerTime:hh:mm tt}: Dinner";
            }

            return Ok(fulfillmentText);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error: {ex.Message}");
        }
    }
}


