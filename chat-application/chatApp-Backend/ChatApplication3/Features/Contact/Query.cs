using ChatApplication.Features.Contacts.Queries; // Update this namespace based on your project structure
using ChatApplication.Models;
using HotChocolate;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ChatApplication.GraphQL
{
    [Route("api/chatApp/contact")]
    [ApiController]
    public class ContactQuery
    {
        // Get all contacts
        [HttpGet]
        public async Task<List<Contact>> GetContacts([Service] IMediator mediator)
        {
            return await mediator.Send(new GetContacts.GetContactsRequest());
        }

        // Get a contact by ID
        [HttpGet("{id}")]
        public async Task<Contact> GetContactById([Service] IMediator mediator, int id)
        {
            return await mediator.Send(new GetContactById.GetContactByIdRequest { ContactId = id });
        }

    }
}
