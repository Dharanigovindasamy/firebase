using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Data.Configuration
{
    public class AdminConfiguration : IEntityTypeConfiguration<Admin>
    {
        public void Configure(EntityTypeBuilder<Admin> builder)
        {
            builder.ToTable("admin");
            builder.HasKey(a => a.AdminId);
            builder.Property(a => a.AdminId)
                .HasColumnName("adminid")
                .ValueGeneratedOnAdd();
            builder.Property(a => a.AdminName)
                .HasColumnName("adminname")
                .HasMaxLength(100);
            builder.Property(a => a.Email)
                .HasColumnName("email")
                .HasMaxLength(100);
            builder.Property(a => a.Password)
                .HasColumnName("password")
                .HasMaxLength(100);
            builder.Property(a => a.category)
                .HasColumnName("category")
               .HasMaxLength(50);
            builder.Property(a => a.Phone)
                .HasColumnName("phone")
               .HasMaxLength(15);
            builder.Property(a => a.Role)
                .HasColumnName("role")
                .HasMaxLength(50);
        }
    }
}