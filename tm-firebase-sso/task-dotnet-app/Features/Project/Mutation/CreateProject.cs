using MediatR;
using task_dotnet_app.Data;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Features.Project.Mutation
{
    public class CreateProject
    {
        public class createProjectRequest : IRequest<Projects>
        {
            public string Name { get; set; }
            public string Description { get; set; }
            public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
            public DateTime UpdatedAt { get; set; }
        }

        public class createProjectHandler : IRequestHandler<createProjectRequest, Projects>
        {
            private readonly TaskDbContext _context;

            public createProjectHandler(TaskDbContext context)
            {
                _context = context;
            }

            public async Task<Projects> Handle(createProjectRequest request, CancellationToken cancellationToken)
            {
                var project = new Projects
                {
                    Name = request.Name,
                    Description = request.Description,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.Projects.Add(project);
                await _context.SaveChangesAsync(cancellationToken);

                return project;
            }
        }
    }
}
