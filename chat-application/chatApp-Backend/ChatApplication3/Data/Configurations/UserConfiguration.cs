using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ChatApplication.Models;

namespace ChatApplication.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("users");

            builder.HasKey(u => u.Uid);

            builder.Property(u => u.Uid)
                .HasColumnName("user_uid")
               // .UseIdentityAlwaysColumn()
                .HasMaxLength(28)
                .IsRequired();

            builder.Property(u => u.UserName)
                .IsRequired()
                .HasMaxLength(50) 
                .HasColumnName("user_name");

            builder.Property(u => u.UserEmail)
                .IsRequired()
                .HasMaxLength(100)
                 .HasColumnName("user_email");


            builder.Property(u => u.UserPhone)
                .HasMaxLength(15)
                .HasColumnName("user_phone");

            builder.Property(u => u.Password)
                .HasMaxLength(15)
                .HasColumnName("password");

            builder.Property(u => u.DeviceToken)
               .IsRequired()
               .HasMaxLength(50)
               .HasColumnName("device_token");

            builder.Property(u => u.WebPushToken)
               .IsRequired()
               .HasMaxLength(50)
               .HasColumnName("web_push_token");


        }
    }
}
