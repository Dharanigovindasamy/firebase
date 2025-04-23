using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Data.Configuration
{
    public class ProjectConfiguration : IEntityTypeConfiguration<Projects>
    {
        public void Configure(EntityTypeBuilder<Projects> builder)
        {
            builder.ToTable("projects");

            builder.Property(p => p.Id)
                .HasColumnName("project_id")
                .ValueGeneratedOnAdd()
                .UseIdentityAlwaysColumn();

            builder.Property(p => p.Name)
                .HasColumnName("name")
                .HasMaxLength(100);

            builder.Property(p => p.Description)
                .HasColumnName("description")
                .HasMaxLength(500);

            builder.Property(p => p.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("datetime")
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            builder.Property(p => p.UpdatedAt)
                .HasColumnName("updated_at")
                .ValueGeneratedOnAdd()
                .HasColumnType("datetime")
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .ValueGeneratedOnUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

           builder.HasMany(p => p.Users)
                .WithOne(u => u.Project)
                .HasForeignKey(u => u.ProjectId)
                .OnDelete(DeleteBehavior.SetNull);
            //builder.HasMany(p => p.TaskItems)
            //    .WithOne(t => t.Projects)
            //    .HasForeignKey(t => t.ProjectId)
            //    .OnDelete(DeleteBehavior.Cascade);

        }
    }
   
}
