using MediatR;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using task_dotnet_app.Data;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Features.Task.Mutation
{
    public class DeleteTask
    {
        public class DeleteTaskRequest : IRequest<bool>
        {
            public int Id { get; set; }
        }

        public class deleteTaskHandler : IRequestHandler<DeleteTaskRequest, bool>
        {
            private readonly TaskDbContext _context;

            public deleteTaskHandler(TaskDbContext context)
            {
                _context = context;
            }

            public async Task<bool> Handle(DeleteTaskRequest request, CancellationToken cancellationToken)
            {
                var task = await _context.TaskItems.FindAsync(request.Id);
                if (task == null)
                {
                    return false;
                }

                _context.TaskItems.Remove(task);
                await _context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}
