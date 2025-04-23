using MediatR;
using task_dotnet_app.Data;
using task_dotnet_app.Data.Model;
using System.Threading;
using System.Threading.Tasks;

namespace task_dotnet_app.Features.Role.Mutation
{
    public class DeleteRole
    {
        public class DeleteRoleRequest : IRequest<bool>
        {
            public int Id { get; set; }
        }

        public class DeleteRoleHandler : IRequestHandler<DeleteRoleRequest, bool>
        {
            private readonly TaskDbContext _context;

            public DeleteRoleHandler(TaskDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(DeleteRoleRequest request, CancellationToken cancellationToken)
            {
                var role = await _context.Roles.FindAsync(request.Id);
                if (role == null)
                {
                    return false;
                }

                _context.Roles.Remove(role);
                await _context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}