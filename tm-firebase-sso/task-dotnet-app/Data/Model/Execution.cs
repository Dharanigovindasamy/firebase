 namespace task_dotnet_app.Data.Model
{
    public class Execution
    {
        public int Id { get; set; }
        public string Assignee { get; set; }
        public DateTime Date { get; set; }
        public string Summary { get; set; }
        public string Comments { get; set; }
        public string IssueType { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public double EstimatedTime { get; set; }
        public double ActualTime { get; set; }
        public string Attachment { get; set; }

        // Foreign key
        public int TaskId { get; set; }

        // Navigation property
        public TaskItems TaskItem { get; set; }
    }

}
