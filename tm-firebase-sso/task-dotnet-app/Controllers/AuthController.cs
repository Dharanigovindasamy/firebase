using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using task_dotnet_app.Data;
using task_dotnet_app.Data.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using System.Text;
using MediatR;

namespace task_dotnet_app.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly TaskDbContext _db;

        public AuthController(IConfiguration config, TaskDbContext db)
        {
            _config = config;
            _db = db;

            if (FirebaseApp.DefaultInstance == null)
            {
                FirebaseApp.Create(new AppOptions
                {
                    Credential = GoogleCredential.FromFile("firebase-service-account.json")
                });
            }
        }

        [HttpPost("firebase-login")]
        public async Task<IActionResult> FirebaseLogin([FromBody] FirebaseLoginRequest request)
        {
            try
            {
                FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(request.IdToken);

                if (decodedToken.Uid != request.Uid)
                    return Unauthorized("UID in token does not match UID in request.");

                var user = await _db.AppUsers.FirstOrDefaultAsync(u => u.FirebaseUid == request.Uid);
                if (user == null)
                {
                    user = new AppUser { FirebaseUid = request.Uid, Email = request.Email };
                    _db.AppUsers.Add(user);
                    await _db.SaveChangesAsync();
                }

                var jwt = GenerateJwt(user.FirebaseUid);

                return Ok(new { jwt });
            }
            catch (Exception ex)
            {
                return Unauthorized(new { error = ex.Message });
            }
        }

        [HttpPost("sso-login")]
        public async Task<IActionResult> SsoLogin([FromBody] FirebaseLoginRequest request)
        {
            try
            {
                FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(request.IdToken);

                if (decodedToken.Uid != request.Uid)
                    return Unauthorized("UID in token does not match UID in request.");

                var user = await _db.AppUsers.FirstOrDefaultAsync(u => u.FirebaseUid == request.Uid);
                if (user == null)
                {
                    user = new AppUser { FirebaseUid = request.Uid, Email = request.Email };
                    _db.AppUsers.Add(user);
                    await _db.SaveChangesAsync();
                }

                var jwt = GenerateJwt(user.FirebaseUid);

                return Ok(new { jwt });
            }
            catch (Exception ex)
            {
                return Unauthorized(new { error = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            try
            {
                // Check if the user already exists by email
                var user = await _db.LoginModels.FirstOrDefaultAsync(u => u.Email == login.Email);

                if (user == null)
                {
                    // First-time user, hash password before storing
                    string passwordHash = BCrypt.Net.BCrypt.HashPassword(login.Password);

                    user = new LoginModel
                    {
                        Email = login.Email,
                        Password = passwordHash
                    };

                    _db.LoginModels.Add(user);
                    await _db.SaveChangesAsync();

                    var jwt = GenerateJwt(user.Email);
                    return Ok(new { jwt });
                }
                else
                {
                    // Existing user, validate password
                    bool isValid = BCrypt.Net.BCrypt.Verify(login.Password, user.Password);
                    if (!isValid)
                        return Unauthorized(new { error = "Invalid email or password." });

                    var jwt = GenerateJwt(user.Email);
                    return Ok(new { jwt });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }




        private string GenerateJwt(string uid)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, uid),
                new Claim("uid", uid)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
