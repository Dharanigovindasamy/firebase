using MediatR;
using Microsoft.AspNetCore.Mvc;
using task_dotnet_app.Data;
using task_dotnet_app.Features.Mutation;
using task_dotnet_app.Features.Project.Mutation;
using task_dotnet_app.Features.Project.Query;

namespace task_dotnet_app.Features.Task
{
    [Route("api/project")]
    [ApiController]
    public class ProjectMutation(IMediator mediator, TaskDbContext context) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> CreateProject([FromBody] CreateProject.createProjectRequest request)
        {
            var result = await mediator.Send(request);
            return Ok(result);
        }

        [HttpPost("createProjectRole")]
        public async Task<IActionResult> CreateProjectRole([FromBody] CreateProjectRole.CreateProjectRoleRequest request)
        {
            var result = await mediator.Send(request);
            return Ok(result);
        }


        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateProject([FromRoute] int id, [FromBody] UpdateProject.updateProjectRequest request)
        {
            request.Id = id;
            var result = await mediator.Send(request);
            return Ok(result);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteProject([FromRoute] int id)
        {
            var request = new DeleteProject.deleteProjectRequest { Id = id };
            var result = await mediator.Send(request);
            return Ok(result);
        }

    }
  
}
