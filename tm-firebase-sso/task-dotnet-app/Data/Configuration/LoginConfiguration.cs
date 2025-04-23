using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Data.Configuration
{
    public class LoginConfiguration : IEntityTypeConfiguration<FirebaseLoginRequest>
    {
        public void Configure(EntityTypeBuilder<FirebaseLoginRequest> builder)
        {
            builder.ToTable("login");

            builder.Property(p => p.Id)
              .HasColumnName("id")
              .ValueGeneratedOnAdd()
              .UseIdentityAlwaysColumn();

            builder.Property(p => p.Uid)
                .HasColumnName("Uid")
                .HasMaxLength(100);

            builder.Property(p => p.Email)
                .HasColumnName("email")
                .HasMaxLength(100);

            builder.Property(p => p.IdToken)
                .HasColumnName("id_token")
                .HasMaxLength(500);

            builder.Property(p => p.CreatedAt)
                .HasColumnName("created_at")
                .HasColumnType("datetime")
                .ValueGeneratedOnAdd()
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

        }
    }

}
