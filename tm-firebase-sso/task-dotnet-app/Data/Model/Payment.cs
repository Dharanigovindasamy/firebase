using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace task_dotnet_app.Data.Model

{
    public class Payment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string PaymentMethod { get; set; }
        public string? BankName { get; set; }
        public string? AccountNumber { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public int? CVV { get; set; }
        public string? CardHolderName { get; set; }

        public double Amount { get; set; }
        public DateTime? PaymentDate { get; set; }
        public string Status { get; set; }
        //[ForeignKey("User")]
        //public int UserId { get; set; }
        ////public string Email { get; set; }
        //public Users User { get; set; }


    }
}
