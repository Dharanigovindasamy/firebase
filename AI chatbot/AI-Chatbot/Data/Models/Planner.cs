using System;
using System.Collections.Generic;

namespace AI_Chatbot.Data.Models
{
	public class Planner
	{
		public int Id { get; set; }
		public TimeSpan WakeTime { get; set; }
		public TimeSpan WorkHours { get; set; }
		public List<string> Activities { get; set; } = new List<string>();
		public TimeSpan FreeTime { get; set; }
	}
}