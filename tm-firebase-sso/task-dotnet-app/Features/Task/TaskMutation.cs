using MediatR;
using Microsoft.AspNetCore.Mvc;
using task_dotnet_app.Data;
using task_dotnet_app.Data.Model;
using task_dotnet_app.Features.Task.Mutation;

namespace task_dotnet_app.Features.Task
{
    [Route("api/task")]
    [ApiController]
    public class TaskMutation : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly TaskDbContext _context;

        public TaskMutation(IMediator mediator, TaskDbContext context)
        {
            _mediator = mediator;
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<TaskItems>> CreateTask([FromBody] CreateTask.createTaskRequest request)
        {
            var result = await _mediator.Send(request);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TaskItems>> UpdateTask(int id, UpdateTask.updateTaskRequest request)
        {
            if (id != request.TaskId)
            {
                return BadRequest("Task ID mismatch");
            }

            var result = await _mediator.Send(request);
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteTask(int id)
        {
            var request = new DeleteTask.DeleteTaskRequest { Id = id };
            var result = await _mediator.Send(request);
            if (!result)
            {
                return NotFound("Task not found");
            }
            return Ok(result);
        }
    }
}