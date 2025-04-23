using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace task_dotnet_app.Data.Model
{
    public class UserTasks
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime? CompletedAt { get; set; } = null;
        public int UserId { get; set; }
        public Users User { get; set; }

        public int TaskId { get; set; }
        public TaskItems TaskItems { get; set; }

        public int ProjectId { get; set; }
        public Projects Project { get; set; }
    }
}
