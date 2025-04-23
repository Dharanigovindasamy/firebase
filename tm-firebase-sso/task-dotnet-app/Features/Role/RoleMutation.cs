using MediatR;
using Microsoft.AspNetCore.Mvc;
using task_dotnet_app.Data.Model;
using task_dotnet_app.Features.Role.Mutation;

namespace task_dotnet_app.Features.Task
{
    [Route("api/role")]
    [ApiController]
    public class RoleMutation : ControllerBase
    {
        private readonly IMediator _mediator;

        public RoleMutation(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<Roles>> CreateRole(CreateRole.createRoleRequest request)
        {
            var result = await _mediator.Send(request);
            if (result == null)
            {
                return NotFound("Role not created");
            }
            return Ok((Roles)result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Roles>> UpdateRole(UpdateRole.UpdateRoleRequest request)
        {
            var result = await _mediator.Send(request);
            if (result == null)
            {
                return NotFound("Role not updated");
            }
            return Ok((Roles)result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> DeleteRole(int id)
        {
            var request = new DeleteRole.DeleteRoleRequest { Id = id };
            var result = await _mediator.Send(request);
            if (!result)
            {
                return NotFound("Role not found");
            }
            return Ok(result);
        }
    }

}
