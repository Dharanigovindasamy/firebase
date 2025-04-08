using ChatApplication.Features.Users.Mutation;
using ChatApplication.Models;
using ChatApplication.Features;
using HotChocolate;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ChatApplication.GraphQL
{
    [Route("api/chatApp/user")]
    [ApiController]
    public class Mutation(IMediator mediator)
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        public async Task<User> CreateUser(CreateUser.CreateUserRequest request)
        {
            return await _mediator.Send(request);
        }

       
        [HttpPut("{uid}")]
        public async Task<User> UpdateUser(UpdateUser.UpdateUserRequest request)
        {
            return await _mediator.Send(request);
        }

        [HttpDelete("{uid}")]
        public async Task<bool> DeleteUser(string uid)
        {
            var request = new DeleteUser.DeleteUserRequest { Uid = uid };
            return await _mediator.Send(request);
        }

    }
}
