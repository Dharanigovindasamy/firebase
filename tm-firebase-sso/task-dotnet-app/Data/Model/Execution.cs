using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net.Mail;

namespace task_dotnet_app.Data.Model
{
    public class Execution
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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

        public void EnsureUtcDate()
        {
            if (Date.Kind != DateTimeKind.Utc)
                Date = DateTime.SpecifyKind(Date, DateTimeKind.Utc);
        }
    }
}
