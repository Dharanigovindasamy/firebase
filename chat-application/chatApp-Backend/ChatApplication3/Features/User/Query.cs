using ChatApplication.Features.Users.Queries;
using ChatApplication.Models;
using HotChocolate;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using ChatApplication.Features;

namespace ChatApplication.GraphQL
{

    [Route("api/chatApp/user")]
    [ApiController]
    public class Query
    {
        [HttpGet]
        public async Task<List<User>> GetUsers([Service] IMediator mediator)
        {
            return await mediator.Send(new GetUsers.GetUsersRequest());
        }

        [HttpGet("{id}")]
        public async Task<User> GetUserById([Service] IMediator mediator, string id)
        {
            return await mediator.Send(new GetUserById.GetUserByIdRequest { Uid = id });
        }

    }
}
