using MediatR;
using task_dotnet_app.Data;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Features.User.Mutations
{
    public class UpdateUser
    {
        public class UpdateUserRequest : IRequest<Users>
        {
            public int UserId { get; set; }
            public string UserName { get; set; }
            public string Email { get; set; }
            public int ProjectId { get; set; }
        }

        public class Handler : IRequestHandler<UpdateUserRequest, Users>
        {
            private readonly TaskDbContext _context;

            public Handler(TaskDbContext context)
            {
                _context = context;
            }

            public async Task<Users> Handle(UpdateUserRequest request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.FindAsync(request.UserId);
                if (user == null)
                {
                    throw new Exception("User not found");
                }

                user.userName = request.UserName;
                user.email = request.Email;
                user.ProjectId = request.ProjectId;

                await _context.SaveChangesAsync(cancellationToken);
                return user;
            }
        }
    }
}
