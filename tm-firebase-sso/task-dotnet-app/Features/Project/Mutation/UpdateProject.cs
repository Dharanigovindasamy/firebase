using MediatR;
using task_dotnet_app.Data;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Features.Project.Mutation
{
    public class UpdateProject
    {
        public class updateProjectRequest : IRequest<Projects>
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        }

        public class updateProjectHandler : IRequestHandler<updateProjectRequest, Projects>
        {
            private readonly TaskDbContext _context;

            public updateProjectHandler(TaskDbContext context)
            {
                _context = context;
            }

            public async Task<Projects> Handle(updateProjectRequest request, CancellationToken cancellationToken)
            {
                var project = await _context.Projects.FindAsync(request.Id);
                if (project == null)
                {
                    throw new GraphQLException("Project not found");
                }

                project.Name = request.Name;
                project.Description = request.Description;
                project.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync(cancellationToken);

                return project;
            }
        }
    }
}
