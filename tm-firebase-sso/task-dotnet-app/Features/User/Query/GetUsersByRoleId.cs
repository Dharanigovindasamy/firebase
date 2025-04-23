using MediatR;
using Microsoft.EntityFrameworkCore;
using task_dotnet_app.Data;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Features.User.Queries
{
    public class GetUsersByRole
    {
        public class GetUsersByRoleRequest : IRequest<List<Users>>
        {
            public int RoleId { get; set; }
        }

        public class Handler : IRequestHandler<GetUsersByRoleRequest, List<Users>>
        {
            private readonly TaskDbContext _context;

            public Handler(TaskDbContext context)
            {
                _context = context;
            }

            public async Task<List<Users>> Handle(GetUsersByRoleRequest request, CancellationToken cancellationToken)
            {
                return await _context.Users
                    .Where(u => u.UserRoles.Any(ur => ur.RoleId == request.RoleId))
                    .Include(u => u.UserRoles)
                    .ToListAsync(cancellationToken);
            }
        }
    }
}
