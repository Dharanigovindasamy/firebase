using ChatApplication3.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Text.Json;

namespace ChatApplication3.Data.Configurations
{
    public class NotificationModelConfiguration : IEntityTypeConfiguration<NotificationModel>
    {
        public void Configure(EntityTypeBuilder<NotificationModel> builder)
        {
            builder.ToTable("Notifications");

            // Primary Key
            builder.HasKey(n => n.Id); // You'll need to add Id property to NotificationModel

            // Properties
            builder.Property(n => n.Title)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(n => n.Body)
                .IsRequired()
                .HasMaxLength(500);

            builder.Property(n => n.DeviceToken)
                .IsRequired()
                .HasMaxLength(255);

            // Configure the Data dictionary as JSON
            builder.Property(n => n.Data)
                .HasColumnType("nvarchar(max)")
                .HasConversion(
                    v => System.Text.Json.JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
                    v => System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, string>>(v, (JsonSerializerOptions)null));

            // Additional properties
            builder.Property(n => n.CreatedAt)
                .IsRequired()
                .HasDefaultValueSql("GETUTCDATE()");

            builder.Property(n => n.Status)
                .IsRequired()
                .HasMaxLength(20)
                .HasConversion<string>();
        }
    }
}
