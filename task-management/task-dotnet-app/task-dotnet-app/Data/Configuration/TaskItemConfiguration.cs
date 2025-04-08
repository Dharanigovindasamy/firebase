//using Microsoft.EntityFrameworkCore.Metadata.Builders;
//using Microsoft.EntityFrameworkCore;
//using task_dotnet_app.Data.Model;


//namespace task_dotnet_app.Data.Configuration
//{
//    public class TaskItemConfiguration : IEntityTypeConfiguration<TaskItem>
//    {
//        public object TaskItem { get; internal set; }

//        public void Configure(EntityTypeBuilder<TaskItem> entity)
//        {
//            entity.ToTable("taskItems");

//            entity.Property(e => e.taskId)
//                .HasColumnName("taskId")
//                .ValueGeneratedOnAdd()
//                .UseIdentityAlwaysColumn();

//            entity.Property(e => e.taskName)
//                .HasMaxLength(255)
//                .HasColumnName("taskName");

//            entity.Property(e => e.category)
//                .HasMaxLength(255)
//                .HasColumnName("category");


//            entity.Property(e => e.status)
//                .HasMaxLength(255)
//                .HasColumnName("status");
//        }
//    }
//}
