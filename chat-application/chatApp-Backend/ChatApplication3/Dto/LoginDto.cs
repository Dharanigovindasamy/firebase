namespace ChatApplication.Controllers
{
    public class LoginDto
    {
        public required string Uid { get; set; }

        public required string UserEmail { get; set; }
        public string UserName { get; set; }
    }
}