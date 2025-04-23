using MediatR;
using Microsoft.AspNetCore.Mvc;
using task_dotnet_app.Data.Model;
using task_dotnet_app.Features.Role.Query;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace task_dotnet_app.Features.Role
{
    [Route("api/role")]
    [ApiController]
    public class RoleQuery : ControllerBase
    {
        private readonly IMediator _mediator;

        public RoleQuery(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Roles>>> GetRoles()
        {
            var result = await _mediator.Send(new GetRoles.GetRolesRequest());
            if (result == null)
            {
                return NotFound("No roles found");
            }
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Roles>> GetRoleById(int id)
        {
            var result = await _mediator.Send(new GetRoleById.GetRoleByIdRequest { Id = id });
            if (result == null)
            {
                return NotFound("Role not found");
            }
            return Ok(result);
        }
    }
}