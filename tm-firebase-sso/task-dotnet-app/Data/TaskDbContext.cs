using Microsoft.EntityFrameworkCore;
using task_dotnet_app.Data.Configuration;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Data
{
    public partial class TaskDbContext : DbContext
    {
        public TaskDbContext(DbContextOptions<TaskDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<TaskItems> TaskItems { get; set; }
        public virtual DbSet<UserTasks> UserTasks { get; set; }
        public virtual DbSet<UserRoles> UserRoles { get; set; }
        public virtual DbSet<Projects> Projects { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<Roles> Roles { get; set; }
        public virtual DbSet<ProjectRole> ProjectRoles { get; set; }
        public virtual DbSet<FirebaseLoginRequest> FirebaseLoginRequests { get; set; }
        public virtual DbSet<AppUser> AppUsers { get; set; }
        public virtual DbSet<LoginModel> LoginModels { get; set; }
        public virtual DbSet<Admin> Admins { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "English_United States.1252");
            modelBuilder.ApplyConfiguration(new UserConfiguration());

            modelBuilder.ApplyConfiguration(new TaskItemConfiguration());
            modelBuilder.ApplyConfiguration(new UserTaskConfiguration());
            modelBuilder.ApplyConfiguration(new UserRoleConfiguration());
            modelBuilder.ApplyConfiguration(new ProjectConfiguration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new RolesConfiguration());
            modelBuilder.ApplyConfiguration(new ProjectRoleConfiguration());
            modelBuilder.ApplyConfiguration(new LoginConfiguration());
            modelBuilder.ApplyConfiguration(new AppUserConfiguration());
            modelBuilder.ApplyConfiguration(new LoginModelConfiguration());
            modelBuilder.ApplyConfiguration(new AdminConfiguration());

            base.OnModelCreating(modelBuilder);
        }  
    }
}
