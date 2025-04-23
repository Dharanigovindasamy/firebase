using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Data.Configuration
{
    public class AppUserConfiguration : IEntityTypeConfiguration<AppUser>
    {
        public void Configure(EntityTypeBuilder<AppUser> builder)
        {
            builder.ToTable("app_user");

            builder.Property(p => p.Id)
                .HasColumnName("id")
                 .ValueGeneratedOnAdd()
                .UseIdentityAlwaysColumn()
                .HasMaxLength(100);

            builder.Property(p => p.FirebaseUid)
                .HasColumnName("firebaseuid")
                .HasMaxLength(500);

            builder.Property(p => p.Email)
                .HasColumnName("email")
                .HasMaxLength(100);

        }
    }
}
