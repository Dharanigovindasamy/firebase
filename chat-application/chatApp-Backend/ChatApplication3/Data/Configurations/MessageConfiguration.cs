using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ChatApplication.Models;
using GraphQL;

namespace ChatApplication.Data.Configurations
{
    public class MessageConfiguration : IEntityTypeConfiguration<Message>
    {
        public void Configure(EntityTypeBuilder<Message> builder)
        {
            builder.ToTable("messages");

            builder.Property(m => m.Id)
                .HasColumnName("id")
                .UseIdentityAlwaysColumn();

            //builder.Property(m => m.Text)
            //     .HasColumnName("text")
            //    .IsRequired()
            //    .HasMaxLength(500); 

            builder.Property(m => m.CreatedAt)
                 .HasColumnName("createdat")
                 .IsRequired();


            builder.Property(c => c.SenderId)
                .HasColumnName("senderid");  

            builder.Property(c => c.ReceiverId)
                .HasColumnName("receiverid");

            builder.HasOne(m => m.Sender)
                .WithMany(u => u.SentMessages)
                .HasForeignKey(m => m.SenderId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(m => m.Receiver)
                .WithMany(u => u.ReceivedMessages)
                .HasForeignKey(m => m.ReceiverId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(m => m.Content)
                .HasColumnName("content")
               .IsRequired()
               .HasMaxLength(500);

            builder.Property(m => m.IsNotificationSent)
                .HasColumnName("isnotificationsent")
               .IsRequired()
               .HasMaxLength(500);

        }
    }
}
