using MediatR;
using Microsoft.AspNetCore.Mvc;
using task_dotnet_app.Data.Model;
using task_dotnet_app.Features.Task.Query;

namespace task_dotnet_app.Features.Task
{
    [Route("api/task")]
    [ApiController]
    public class TaskQuery:Controller
    {
        private readonly IMediator _mediator;
        private readonly Data.TaskDbContext _context;

        public TaskQuery(IMediator mediator, Data.TaskDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<TaskItems>>> GetTasks([FromQuery] GetTasks.getTasksRequest request) { 
            var result = await _mediator.Send(request);
            if (result == null)
            {
                return NotFound("Tasks not found");
            }
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Data.Model.TaskItems>> GetTaskById(int id)
        {
            var request = new Query.GetTaskById.getTaskByIdRequest { Id = id };
            var result = await _mediator.Send(request);
            if (result == null)
            {
                return NotFound("Task not found");
            }
            return Ok(result);
        }
    }
}
