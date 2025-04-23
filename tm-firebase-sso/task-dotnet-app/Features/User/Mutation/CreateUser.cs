using MediatR;
using task_dotnet_app.Data;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Features.User.Mutations
{
    public class CreateUser
    {
        public class CreateUserRequest : IRequest<Users>
        {
            public string UserName { get; set; }
            public string Email { get; set; }
            public int ProjectId { get; set; } 
        //    public int RoleId { get; set; } 
        }

        public class Handler : IRequestHandler<CreateUserRequest, Users>
        {
            private readonly TaskDbContext _context;

            public Handler(TaskDbContext context)
            {
                _context = context;
            }

            public async Task<Users> Handle(CreateUserRequest request, CancellationToken cancellationToken)
            {
                // Check if project exists
                var project = await _context.Projects.FindAsync(request.ProjectId);
                if (project == null)
                {
                    throw new Exception($"Project with ID {request.ProjectId} not found.");
                }

                var user = new Users
                {
                    userName = request.UserName,
                    email = request.Email,
                    ProjectId = request.ProjectId,
                    Project = project,
                 //   Role = await _context.Roles.FindAsync(request.RoleId) 
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync(cancellationToken);

                return user;
            }
        }
    }
}
