namespace task_dotnet_app.Data.Model
{
    public class LoginModel
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public Boolean refreshPassword { get; set; } = true;
        //  public string PasswordHash { get; set; }
    }
}