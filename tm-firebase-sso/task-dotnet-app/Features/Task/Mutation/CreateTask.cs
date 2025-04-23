using MediatR;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using task_dotnet_app.Data;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Features.Task.Mutation
{
    public class CreateTask
    {
        public class createTaskRequest : IRequest<TaskItems>
        {
            public string TaskName { get; set; }
            public string TaskDescription { get; set; } = string.Empty;
            public string Category { get; set; }
            public string Status { get; set; }
            public int AssigneeId { get; set; }
            public int ReporterId { get; set; }
            public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
            public required DateTime StartedAt { get; set; }
            public DateTime DueDate { get; set; }
            public string? Priority { get; set; }
            public string? Comments { get; set; }
            public string? Attachment { get; set; }
          //  public Users? User { get; set; }
            public int ProjectId { get; set; }
           
        }

        public class createTaskHandler : IRequestHandler<createTaskRequest, TaskItems>
        {
            private readonly TaskDbContext _context;

            public createTaskHandler(TaskDbContext context)
            {
                _context = context;
            }

            public async Task<TaskItems> Handle(createTaskRequest request, CancellationToken cancellationToken)
            {
                var task = new TaskItems
                {
                    TaskName = request.TaskName,
                    TaskDescription = request.TaskDescription,
                    Category = request.Category,
                    Status = request.Status,
                    AssigneeId = request.AssigneeId,
                    ReporterId = request.ReporterId,
                    CreatedAt = DateTime.UtcNow,
                    StartedAt = request.StartedAt,
                    DueDate = request.DueDate,
                    Priority = request.Priority,
                    Comments = request.Comments,
                    Attachment = request.Attachment,
                    ProjectId = request.ProjectId,
                   // User = request.User
                };

                _context.TaskItems.Add(task);
                await _context.SaveChangesAsync(cancellationToken);

                return task;
            }
        }
    }
}
