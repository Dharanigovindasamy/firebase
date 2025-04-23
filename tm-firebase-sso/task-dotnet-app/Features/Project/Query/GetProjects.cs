using MediatR;
using Microsoft.EntityFrameworkCore;
using task_dotnet_app.Data;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Features.Project.Query
{
    public class GetProjects
    {
        public class getProjectsRequest : IRequest<List<Projects>>
        {

        }
        public class getProjectsHandler : IRequestHandler<getProjectsRequest, List<Projects>>
        {
            private readonly TaskDbContext _context;

            public getProjectsHandler(TaskDbContext context)
            {
                _context = context;
            }

            public async Task<List<Projects>> Handle(getProjectsRequest request, CancellationToken cancellationToken)
            {
                var projects = await _context.Projects.ToListAsync(cancellationToken);
                return projects;
            }
        }
    }
}
