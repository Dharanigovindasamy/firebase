using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using AI_Chatbot.Data.Models;
using System;
using System.Collections.Generic;

namespace AI_Chatbot.Data.Models {
    public class SchedulePlan
    {
        public int Id { get; set; }
        public string WakeUpTime { get; set; }
        public string Work { get; set; }
        public string WorkTime { get; set; }
        public string Task { get; set; }
        public DateTime DateTime { get; set; }
        public string Duration { get; set; }
        public string UserMessage { get; set; }
    }
}

