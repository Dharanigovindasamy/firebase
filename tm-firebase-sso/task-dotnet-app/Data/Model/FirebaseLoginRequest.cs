using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net.Mail;

namespace task_dotnet_app.Data.Model
{
    public class FirebaseLoginRequest
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Uid { get; set; }
        public string IdToken { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

