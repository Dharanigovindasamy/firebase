    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    namespace task_dotnet_app.Data.Model
    {
        public class Projects
        {
            [Key]
            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            public int Id { get; set; }
            public required string Name { get; set; }
            public required string Description { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime UpdatedAt { get; set; }
            public List<TaskItems> TaskItems { get; set; } = new List<TaskItems>();
            public List<Users> Users { get; set; } = new List<Users>();
        public List<Roles> Roles { get; set; } = new List<Roles>();

        public List<ProjectRole> ProjectRoles { get; set; } = new();


        }
    }
