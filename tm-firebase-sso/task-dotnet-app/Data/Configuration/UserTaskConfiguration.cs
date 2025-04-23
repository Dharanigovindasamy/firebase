using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Data.Configuration
{
    public class UserTaskConfiguration : IEntityTypeConfiguration<UserTasks>
    {
        public void Configure(EntityTypeBuilder<UserTasks> builder)
        {
            builder.ToTable("user_tasks");

            builder.HasKey(ut => ut.Id);

            builder.HasOne(ut => ut.User)
                .WithMany(u => u.UserTasks)
                .HasForeignKey(ut => ut.UserId);

            builder.HasOne(ut => ut.TaskItems)
                .WithMany(t => t.UserTasks)
                .HasForeignKey(ut => ut.TaskId);

            builder.HasOne(ut => ut.Project)
                .WithMany()
                .HasForeignKey(ut => ut.ProjectId);
        }
    }
}
