using System;
using System.Collections.Generic;

namespace ChatApplication3.Data.Models
{
    public class NotificationModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string DeviceToken { get; set; }
        public Dictionary<string, string> Data { get; set; }
        public DateTime CreatedAt { get; set; }
        public NotificationStatus Status { get; set; }
        public string? ErrorMessage { get; set; }
    }

    public enum NotificationStatus
    {
        Pending,
        Sent,
        Failed
    }
}
