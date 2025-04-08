using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ChatApplication.Models;

namespace ChatApplication.Data.Configurations
{
    public class ContactConfiguration : IEntityTypeConfiguration<Contact>
    {
        public void Configure(EntityTypeBuilder<Contact> builder)
        {
            builder.ToTable("contacts");

            builder.Property(c => c.ContactId)
                .HasColumnName("contact_id")
                .UseIdentityAlwaysColumn(); 

            builder.Property(c => c.Name)
                .HasColumnName("contact_name")
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(c => c.ContactNumber)
                .HasColumnName("contact_number")
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(c => c.OwnerId)
                .HasColumnName("owner_id"); 

            builder.Property(c => c.OppositeId)
                .HasColumnName("opposite_id"); 

            builder.HasOne(c => c.Owner)
                .WithMany(u => u.Contacts)
                .HasForeignKey(c => c.OwnerId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(c => c.Opposite)
                .WithMany()
                .HasForeignKey(c => c.OppositeId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }

}
