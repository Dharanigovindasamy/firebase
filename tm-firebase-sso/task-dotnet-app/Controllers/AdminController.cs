using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using task_dotnet_app.Data.Model;
using task_dotnet_app.Data;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace task_dotnet_app.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly TaskDbContext _context;

        public AdminController(TaskDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Admin>>> GetAdmins()
        {
            return await _context.Admins.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Admin>> GetAdmin(int id)
        {
            var admin = await _context.Admins.FindAsync(id);

            if (admin == null)
            {
                return NotFound();
            }

            return admin;
        }

        [HttpPost]
        public async Task<ActionResult<Admin>> PostAdmin(Admin admin)
        {
             admin.Password = BCrypt.Net.BCrypt.HashPassword(admin.Password);
            _context.Admins.Add(admin);

            var login = new LoginModel
            {
                Email = admin.Email,
                Password = admin.Password, 
                refreshPassword = true
            };

            Console.WriteLine($"RefreshPassword: {login.refreshPassword}");
            _context.LoginModels.Add(login);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAdmin), new { id = admin.AdminId}, admin);
        }
    }
}