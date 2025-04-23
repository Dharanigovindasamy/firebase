namespace task_dotnet_app.Data.Model
{
    public class UserRoles
    {
        public int UserRoleId { get; set; }
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public Users User { get; set; }
        public Roles Role { get; set; }

    }
}
