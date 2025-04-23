using MediatR;
using task_dotnet_app.Data;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Features.Project.Mutation
{
    public class DeleteProject
    {
        public class deleteProjectRequest : IRequest<bool>
        {
            public int Id { get; set; }
        }

        public class deleteProjectHandler : IRequestHandler<deleteProjectRequest, bool>
        {
            private readonly TaskDbContext _context;

            public deleteProjectHandler(TaskDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(deleteProjectRequest request, CancellationToken cancellationToken)
            {
                var project = await _context.Projects.FindAsync(request.Id);
                if (project == null)
                {
                    return false;
                }

                _context.Projects.Remove(project);
                await _context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}
