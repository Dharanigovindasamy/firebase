using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.VisualBasic;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Xml.Linq;
using task_dotnet_app.Data;
using task_dotnet_app.Data.Model;

namespace task_dotnet_app.Features.Task.Mutation
{
    public class UpdateTask
    {
        public class updateTaskRequest : IRequest<TaskItems>
        {
            public int TaskId { get; set; }
            public string TaskName { get; set; }
            public string TaskDescription { get; set; } = string.Empty;
            public string Category { get; set; }
            public string Status { get; set; }
            public int AssigneeId { get; set; }
            public int ReporterId { get; set; }
            //public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
            public required DateTime StartedAt { get; set; } = DateTime.UtcNow;
            public DateTime DueDate { get; set; }
            public string? Priority { get; set; }
            public string? Comments { get; set; }
            public string? Attachment { get; set; }
         //   public Users? User { get; set; }
            public int ProjectId { get; set; }
        }

        public class updateTaskHandler : IRequestHandler<updateTaskRequest, TaskItems>
        {
            private readonly TaskDbContext _context;

            public updateTaskHandler(TaskDbContext context)
            {
                _context = context;
            }

            public async Task<TaskItems> Handle(updateTaskRequest request, CancellationToken cancellationToken)
            {
                var tasks = await _context.TaskItems.FindAsync(request.TaskId);
                if (tasks == null)
                {
                    throw new GraphQLException("Project not found");
                }

                tasks.TaskName = request.TaskName;
                tasks.TaskDescription = request.TaskDescription;
                tasks.Category = request.Category;
                tasks.Status = request.Status;
                tasks.AssigneeId = request.AssigneeId;
                tasks.ReporterId = request.ReporterId;
                //tasks.CreatedAt = DateTime.UtcNow;
                tasks.StartedAt = request.StartedAt;
                tasks.DueDate = request.DueDate;
                tasks.Priority = request.Priority;
                tasks.Comments = request.Comments;
                tasks.Attachment = request.Attachment;
                tasks.ProjectId = request.ProjectId;
              //  tasks.User = request.User;

                await _context.SaveChangesAsync(cancellationToken);

                return tasks;
            }
        }
    }
}
