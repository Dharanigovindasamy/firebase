using Microsoft.AspNetCore.Mvc;
using task_dotnet_app.Data.Model;
using task_dotnet_app.Data;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;

namespace task_dotnet_app.Controllers
{

    [Route("api/payment")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly TaskDbContext _context;

        public PaymentController(TaskDbContext context)
        {
            _context = context;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreatePayment([FromBody] Payment request)
        {
            if (request == null || request.Amount <= 0)
            {
                return BadRequest("Invalid payment request.");
            }

            var payment = new Payment
            {
                PaymentMethod = request.PaymentMethod,
                BankName = request.BankName,
                AccountNumber = request.AccountNumber,
                ExpiryDate = request.ExpiryDate.HasValue
                    ? DateTime.SpecifyKind(request.ExpiryDate.Value, DateTimeKind.Utc)
                    : (DateTime?)null,
                CVV = request.CVV,
                CardHolderName = request.CardHolderName,
                Amount = request.Amount,
                PaymentDate = request.PaymentDate.HasValue
                    ? DateTime.SpecifyKind(request.PaymentDate.Value, DateTimeKind.Utc)
                    : (DateTime?)null,
                Status = request.Status
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return Ok(new { PaymentId = payment.Id, Status = payment.Status });
        }

    }
}

