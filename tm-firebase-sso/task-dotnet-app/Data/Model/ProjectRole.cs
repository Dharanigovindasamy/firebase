using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace task_dotnet_app.Data.Model
{
    public class ProjectRole
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        [ForeignKey("Project")]
        public int? ProjectId { get; set; }
        public Projects Project { get; set; }

        [ForeignKey("Role")]
        public int? RoleId { get; set; }
        public Roles Role { get; set; }

    }
}
