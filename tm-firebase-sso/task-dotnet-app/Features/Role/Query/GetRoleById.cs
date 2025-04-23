using MediatR;
using task_dotnet_app.Data;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Features.Role.Query
{
    public class GetRoleById
    {
        public class GetRoleByIdRequest : IRequest<Roles>
        {
            public int Id { get; set; }
        }

        public class GetRoleByIdHandler : IRequestHandler<GetRoleByIdRequest, Roles>
        {
            private readonly TaskDbContext _context;

            public GetRoleByIdHandler(TaskDbContext context)
            {
                _context = context;
            }

            public async Task<Roles> Handle(GetRoleByIdRequest request, CancellationToken cancellationToken)
            {
                var role = await _context.Roles.FindAsync(request.Id);
                if (role == null)
                {
                    throw new GraphQLException("Role not found");
                }

                return role;
            }
        }
    }
}
