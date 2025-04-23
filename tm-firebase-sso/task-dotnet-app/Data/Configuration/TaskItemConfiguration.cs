using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using task_dotnet_app.Data.Model;


namespace task_dotnet_app.Data.Configuration
{
    public class TaskItemConfiguration : IEntityTypeConfiguration<TaskItems>
    {
        public void Configure(EntityTypeBuilder<TaskItems> entity)
        {
            entity.ToTable("tasks");

            entity.Property(e => e.TaskId)
                .HasColumnName("task_id")
                .ValueGeneratedOnAdd()
                .UseIdentityAlwaysColumn();

            entity.Property(e => e.TaskName)
                .HasMaxLength(255)
                .HasColumnName("task_name");

            entity.Property(e => e.TaskDescription)
                .HasMaxLength(255)
                .HasColumnName("description");

            entity.Property(e => e.Category)
                .HasMaxLength(255)
                .HasColumnName("category");


            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .HasColumnName("status");

            entity.Property(e => e.Attachment)
              .HasMaxLength(255)
              .HasColumnName("attachment");

            entity.Property(e => e.Priority)
                .HasMaxLength(255)
                .HasColumnName("priority");

            entity.Property(e => e.Comments)
                .HasMaxLength(255)
                .HasColumnName("comments");

            entity.Property(e => e.CreatedAt)
                .HasColumnType("datetime")
                .HasColumnName("created_at");

            entity.Property(e => e.StartedAt)
                .HasColumnType("datetime")
                .HasColumnName("started_at");

            entity.Property(e => e.DueDate)
                .HasColumnType("datetime")
                .HasColumnName("due_date");

            entity.Property(e => e.AssigneeId)
                .HasColumnName("assignee_id")
                .HasColumnType("int");

            entity.Property(e => e.ReporterId)
                .HasColumnName("reporter_id")
                .HasColumnType("int");

            entity.Property(e => e.ProjectId)
                .HasColumnName("project_id")
                .HasColumnType("int");

            entity.HasOne(d => d.Assignee)
                .WithMany(p => p.AssignedTasks)
                .HasForeignKey(d => d.AssigneeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tasks_users_assignee_id");

            entity.HasOne(d => d.Reporter)
                .WithMany(p => p.ReportedTasks)
                .HasForeignKey(d => d.ReporterId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_tasks_users_reporter_id");
        }
    }
}
