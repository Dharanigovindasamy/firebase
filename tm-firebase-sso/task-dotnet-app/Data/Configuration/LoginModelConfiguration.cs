using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Data.Configuration
{
    public class LoginModelConfiguration : IEntityTypeConfiguration<LoginModel>
    {
        public void Configure(EntityTypeBuilder<LoginModel> builder)
        {
            builder.ToTable("login_model");

            builder.Property(p => p.Id)
                .HasColumnName("id")
                .ValueGeneratedOnAdd()
                .UseIdentityAlwaysColumn()
                .HasMaxLength(100);

            builder.Property(p => p.Email)
                .HasColumnName("email")
                .HasMaxLength(100);

            builder.Property(p => p.Password)
                .HasColumnName("password")
                .HasMaxLength(100);
        }
    }
}