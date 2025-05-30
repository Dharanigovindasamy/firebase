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

                string wakeUpTime = parameters?["wakeuptime"]?.ToString();
                string work = parameters?["work"]?.ToString();
                string workTime = parameters?["worktime"]?.ToString();
                string hobby = parameters?["hobby"]?.ToString();
                string dateTime = parameters?["date-time"]?.ToString();
                string duration = parameters?["duration"]?.ToString();

                if (intentName == "Free time")
                {
                    var schedule = new SchedulePlan
                    {
                        WakeUpTime = wakeUpTime,
                        Work = work,
                        WorkTime = workTime,
                        Task = hobby,
                        DateTime = !string.IsNullOrEmpty(dateTime) ? DateTime.Parse(dateTime) : DateTime.Now,
                        Duration = duration,
                        UserMessage = userMessage.UserInput
                    };

                    await _dbContext.SchedulePlan.AddAsync(schedule);
                    await _dbContext.SaveChangesAsync();

                    fulfillmentText = $@"
📝 Here is your personalized schedule for today:

☀️ Wake up at: {wakeUpTime ?? "Not provided"}  
💼 Work: {work ?? "None"} {(string.IsNullOrEmpty(workTime) ? "" : $"({workTime})")}  
🎉 Activity: {hobby ?? "Relaxing"} at {(string.IsNullOrEmpty(dateTime) ? "some time" : dateTime)}  
⏳ Free Time: {duration ?? "Not mentioned"}";
                }

                return Ok(fulfillmentText);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error: {ex.Message}");
            }
        }


}

