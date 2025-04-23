using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net.Mail;

namespace task_dotnet_app.Data.Model
{
    public class TaskItems
    {
        internal int userId;

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TaskId { get; set; } 

        [Required]
        public string TaskName { get; set; }

        [Required]
        public string TaskDescription { get; set; } = string.Empty;

        [Required]
        public string Category { get; set; }

        [Required]
        public string Status { get; set; }

        public int AssigneeId { get; set; }
        [ForeignKey("AssigneeId")]
        public Users Assignee { get; set; }

        public int ReporterId { get; set; }
        [ForeignKey("ReporterId")]
        public Users Reporter { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public required DateTime StartedAt { get; set; }

        [Required]
        public DateTime DueDate { get; set; }
        public string? Priority { get; set; }
        public string? Comments { get; set; }
        public string? Attachment { get; set; }

      //  public Users? User { get; set; }
        public int ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        public Projects? Projects { get; set; }
        public List<Roles>? Roles { get; set; } = new List<Roles>();
        public List<UserTasks> UserTasks { get; set; }




    }
}
