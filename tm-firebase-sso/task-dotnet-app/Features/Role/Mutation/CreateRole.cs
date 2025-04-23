using task_dotnet_app.Data.Model;
using MediatR;
using task_dotnet_app.Data;

namespace task_dotnet_app.Features.Role.Mutation
{
    public class CreateRole
    {
        public class createRoleRequest : IRequest<Roles>
        {
            public string Name { get; set; }
            public int ProjectId { get; set; }
            public int userId { get; set; }
            public int taskId { get; set; }

        }

        public class createRoleHandler : IRequestHandler<createRoleRequest, Roles>
        {
            private readonly TaskDbContext _context;

            public createRoleHandler(TaskDbContext context)
            {
                _context = context;
            }

            public async Task<Roles> Handle(createRoleRequest request, CancellationToken cancellationToken)
            {
                var role = new Roles
                {
                    RoleName = request.Name
                };
                   
                _context.Roles.Add(role);
                await _context.SaveChangesAsync(cancellationToken);

                return role;
            }
        }
    }
}
