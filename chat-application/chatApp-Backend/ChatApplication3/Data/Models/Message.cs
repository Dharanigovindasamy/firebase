using System;
using System.Text.Json.Serialization;

namespace ChatApplication.Models
{
    public class Message
    {
        public int Id { get; set; }
//public string Text { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public string SenderId { get; set; }
        public string ReceiverId { get; set; }

        [JsonIgnore]
        public User Sender { get; set; }
        [JsonIgnore]
        public User Receiver { get; set; }
        public bool IsNotificationSent { get; set; }
        public string Content { get;  set; }
    }
}
