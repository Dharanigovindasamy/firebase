using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Data.Configuration
{
    public class RolesConfiguration : IEntityTypeConfiguration<Roles>
    {
        public void Configure(EntityTypeBuilder<Roles> builder)
        {
            builder.ToTable("roles");

            builder.Property(r => r.Id)
                .HasColumnName("role_id")
                .ValueGeneratedOnAdd()
                .UseIdentityAlwaysColumn();

            builder.Property(r => r.RoleName)
                .HasColumnName("role_name")
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(r => r.userId)
                .HasColumnName("user_id")
                .IsRequired();

            builder.Property(r => r.projectId)
                .HasColumnName("project_id")
                .IsRequired(); 

            builder.Property(r => r.taskId)
                .HasColumnName("task_id")
                .IsRequired(); 

            builder.HasOne(r => r.User)
                .WithMany(u => u.Roles)
                .HasForeignKey(r => r.userId)
                .OnDelete(DeleteBehavior.SetNull);

            builder.HasOne(r => r.Project)
                .WithMany(p => p.Roles)  
                .HasForeignKey(r => r.projectId)
                .OnDelete(DeleteBehavior.SetNull); 

            builder.HasOne(r => r.Task)
                .WithMany(t => t.Roles)
                .HasForeignKey(r => r.taskId)
                .OnDelete(DeleteBehavior.SetNull); 

            builder.HasMany(r => r.UserRoles)
                .WithOne(ur => ur.Role)
                .HasForeignKey(ur => ur.RoleId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(r => r.ProjectRoles)
                .WithOne(pr => pr.Role)
                .HasForeignKey(pr => pr.RoleId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
