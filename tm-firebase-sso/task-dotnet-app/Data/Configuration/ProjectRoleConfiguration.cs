using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Data.Configuration
{
    public class ProjectRoleConfiguration : IEntityTypeConfiguration<ProjectRole>
    {
        public void Configure(EntityTypeBuilder<ProjectRole> builder)
        {
            builder.ToTable("project_roles");
        
            builder.Property(pr =>pr.id )
                .HasColumnName("project_role_id")
                .ValueGeneratedOnAdd()
                .UseIdentityAlwaysColumn();


            builder.Property(pr => pr.ProjectId)
              .HasColumnName("project_id")
              .IsRequired();


            builder.Property(pr => pr.RoleId)
                .HasColumnName("role_id")
                .IsRequired();
         

         //   builder.HasKey(pr => new { pr.ProjectId, pr.RoleId });

            builder.HasOne(pr => pr.Project)
                .WithMany(p => p.ProjectRoles)
                .HasForeignKey(pr => pr.ProjectId);

            builder.HasOne(pr => pr.Role)
                .WithMany(r => r.ProjectRoles)
                .HasForeignKey(pr => pr.RoleId);
        }
    }
}
