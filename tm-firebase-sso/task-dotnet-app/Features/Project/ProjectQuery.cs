using MediatR;
using Microsoft.AspNetCore.Mvc;
using task_dotnet_app.Data;
using task_dotnet_app.Features.Project.Query;

namespace task_dotnet_app.Features.Task
{
    [Route("api/project")]
    [ApiController]
    public class ProjectQuery(IMediator mediator, TaskDbContext context) : ControllerBase
    { 
        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetProjectById(GetProjectsById.getProjectsByIdRequest request)
        {
            var result = await mediator.Send(request);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProjects( GetProjects.getProjectsRequest request)
        {
            var result = await mediator.Send(request);
            return Ok(result);
        }
    }
}
