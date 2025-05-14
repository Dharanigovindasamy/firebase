namespace task_dotnet_app.Data.Configuration
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;
    using task_dotnet_app.Data.Model;

    public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            builder.HasKey(p => p.Id);
            builder.ToTable("payments");
            builder.Property(p => p.Id)
                .HasColumnName("id")
                .ValueGeneratedOnAdd()
                .UseIdentityAlwaysColumn();
            builder.Property(p => p.PaymentMethod)
                .HasColumnName("payment_method")
                .IsRequired().
                HasMaxLength(50);

            builder.Property(p =>p.BankName)
                .HasColumnName("bank_name")
                .HasMaxLength(50);

            builder.Property(p => p.AccountNumber)
                .HasColumnName("account_number")
                .HasMaxLength(50);
            builder.Property(p => p.ExpiryDate)
                .HasColumnName("expiry_date")
                .HasMaxLength(50);
            builder.Property(p => p.CVV)
                .HasColumnName("cvv")
                .HasMaxLength(50);
            builder.Property(p => p.CardHolderName)
                .HasColumnName("cardholdername")
                .HasMaxLength(50);
            //builder.Property(p => p.Email)
            //    .HasColumnName("email")
            //    .HasMaxLength(50);
            builder.Property(p=>p.Amount)
                .HasColumnName("amount")
                .HasMaxLength(50);
            builder.Property(p => p.PaymentDate)
                .HasColumnName("paymentdate")
                .HasMaxLength(50);
            builder.Property(p => p.Status)
                .HasColumnName("status")
                .HasMaxLength(50);
            //builder.Property(p => p.UserId)
            //    .HasColumnName("user_id")
            //    .HasMaxLength(50);

            //builder.HasOne(p => p.User)
            //    .WithMany(u => u.Payments)
            //    .HasForeignKey(p => p.UserId);
        }
    }
}