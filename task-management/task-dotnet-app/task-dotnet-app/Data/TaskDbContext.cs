//using Microsoft.EntityFrameworkCore;
//using task_dotnet_app.Data.Configuration;
//using task_dotnet_app.Data.Model;

//namespace task_dotnet_app.Data
//{
//    public partial class TaskDbContext : DbContext
//    {
//        public TaskDbContext(DbContextOptions<TaskDbContext> options)
//            : base(options)
//        {
//        }

//        public virtual DbSet<TaskItem> TaskItems { get; set; }

//        protected override void OnModelCreating(ModelBuilder modelBuilder)
//        {
//            modelBuilder.HasAnnotation("Relational:Collation", "English_United States.1252");

//            modelBuilder.ApplyConfiguration(new TaskItemConfiguration());

//            OnModelCreatingPartial(modelBuilder);
//        }

//        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
//    }
//}
