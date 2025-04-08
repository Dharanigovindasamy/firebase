using ChatApplication.Features.Messages.Queries;
using ChatApplication.Models;
using HotChocolate;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ChatApplication.GraphQL.Features.Queries
{
    [Route("api/chatApp/message")]
    [ApiController]
    public class Query
    {
        private readonly IMediator _mediator;

        public Query(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<List<Message>> GetMessages()
        {
            return await _mediator.Send(new GetMessages.GetMessagesRequest());
        }

        [HttpGet("{id}")]
        public async Task<Message> GetMessageById(int id)
        {
            return await _mediator.Send(new GetMessageById.GetMessageByIdRequest { Id = id });
        }
    }
}
