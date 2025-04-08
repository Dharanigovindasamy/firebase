using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace task_dotnet_app.Data.Model
{
    public class TaskItem
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int taskId { get; set; }
        public string taskName { get; set; }
        public string category { get; set; }
        public string status { get; set; }
    }
}

