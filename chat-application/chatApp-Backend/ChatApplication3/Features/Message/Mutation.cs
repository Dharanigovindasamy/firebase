using ChatApplication.Features.Messages.Mutations;
using ChatApplication.Models;
using HotChocolate;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ChatApplication.GraphQL.Features.Mutations
{
    [Route("api/chatApp/message")]
    [ApiController]
    public class Mutation
    {
        private readonly IMediator _mediator;

        public Mutation(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpPost]
        public async Task<Message> CreateMessage(CreateMessage.CreateMessageRequest request)
        {
            return await _mediator.Send(request);
        }


        [HttpPut("{id}")]
        public async Task<Message> UpdateMessage(UpdateMessage.UpdateMessageRequest request)
        {
            return await _mediator.Send(request);
        }

        
        [HttpDelete("{id}")]
        public async Task<bool> DeleteMessage(DeleteMessage.DeleteMessageRequest request)
        {
            return await _mediator.Send(request);
        }
    }
}
