using MediatR;
using Microsoft.EntityFrameworkCore;
using task_dotnet_app.Data;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Features.User.Queries
{
    public class GetUsers
    {
        public class GetUsersRequest : IRequest<List<Users>> { }

        public class Handler : IRequestHandler<GetUsersRequest, List<Users>>
        {
            private readonly TaskDbContext _context;

            public Handler(TaskDbContext context)
            {
                _context = context;
            }

            public async Task<List<Users>> Handle(GetUsersRequest request, CancellationToken cancellationToken)
            {
                return await _context.Users
                    .Include(u => u.Project)
                    .ToListAsync(cancellationToken);
            }
        }
    }
}
