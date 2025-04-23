using MediatR;
using task_dotnet_app.Data;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Features.Project.Query
{
    public class GetProjectsById
    {
        public class getProjectsByIdRequest : IRequest<Projects>
        {
            public int Id { get; set; }
        }

        public class getProjectsByIdHandler : IRequestHandler<getProjectsByIdRequest, Projects>
        {
            private readonly TaskDbContext _context;

            public getProjectsByIdHandler(TaskDbContext context)
            {
                _context = context;
            }

            public async Task<Projects> Handle(getProjectsByIdRequest request, CancellationToken cancellationToken)
            {
                var project = await _context.Projects.FindAsync(request.Id);
                if (project == null)
                {
                    throw new GraphQLException("Project not found");
                }

                return project;
            }
        }
    }
}
