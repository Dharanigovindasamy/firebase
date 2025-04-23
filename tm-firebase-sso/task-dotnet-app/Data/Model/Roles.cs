using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace task_dotnet_app.Data.Model
{
    public class Roles
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string RoleName { get; set; }
        public int userId { get; set; }
     
        public int projectId { get; set; }
        public int taskId { get; set; }
        public virtual Users User { get; set; }
        public virtual Projects Project { get; set; }
        public virtual TaskItems Task { get; set; }

        public List<UserRoles> UserRoles { get; set; } = new List<UserRoles>();
        public List<ProjectRole> ProjectRoles { get; set; } = new();



    }
}
