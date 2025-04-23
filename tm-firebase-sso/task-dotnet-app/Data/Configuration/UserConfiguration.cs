using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Data.Configuration
{
    public class UserConfiguration: IEntityTypeConfiguration<Users>
    {
        public void Configure(EntityTypeBuilder<Users> builder)
        {

            builder.ToTable("users");
            builder.Property(u => u.userId)
                .HasColumnName("user_id")
                .ValueGeneratedOnAdd()
                .UseIdentityAlwaysColumn();
            builder.Property(u => u.userName)
                .HasColumnName("user_name")
                .HasMaxLength(100);
            builder.Property(u => u.email)
                .HasColumnName("email")
                .HasMaxLength(100);

            builder.Property(u => u.ProjectId)
                .HasColumnName("project_id")
                .IsRequired();

            builder.HasOne(u => u.Project)
                .WithMany(p => p.Users)
                .HasForeignKey(u => u.ProjectId)
                .OnDelete(DeleteBehavior.SetNull);

            //builder.Property(u => u.roleId)
            //   .HasColumnName("role_id")
            //   .IsRequired();

            //builder.HasMany(u => u.Roles)
            //    .WithOne(r => r.User)
            //    .HasForeignKey(r => r.userId)
            //    .OnDelete(DeleteBehavior.SetNull);

            builder.HasMany(u =>u.AssignedTasks)
                .WithOne(t => t.Assignee)
                .HasConstraintName("FK_AssignedTasks_Users")
                .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(u => u.ReportedTasks)
                .WithOne(t => t.Reporter)
                .HasConstraintName("FK_ReportedTasks_Users")
                .OnDelete(DeleteBehavior.NoAction);

         
            builder.HasMany(u => u.UserTasks)
                .WithOne(ut => ut.User)
                .HasForeignKey(ut => ut.UserId)
                .HasConstraintName("FK_UserTasks_Users")
                .OnDelete(DeleteBehavior.NoAction);
        }
    }  
}
