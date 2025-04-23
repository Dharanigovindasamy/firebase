using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace task_dotnet_app.Data.Model
{
    public class Users
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int userId { get; set; }
        public string userName { get; set; }
        public string email { get; set; }
        public int? ProjectId { get; set; }
        [ForeignKey("ProjectId")]
        public Projects Project { get; set; }
        //public int? roleId { get; set; }
        //[ForeignKey("RoleId")]
        //public Roles Role { get; set; }

        public List<TaskItems> AssignedTasks { get; set; }
        public List<TaskItems> ReportedTasks { get; set; }

        public List<Roles> Roles { get; set; }
        public List<UserTasks> UserTasks { get; set; }
        public List<UserRoles> UserRoles { get; set; } = new List<UserRoles>();

    }
}
