using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace task_dotnet_app.Data.Model
{
    public class AppUser
    {
        public int Id { get; set; }
        public string FirebaseUid { get; set; }
        public string Email { get; set; }
    }
}
