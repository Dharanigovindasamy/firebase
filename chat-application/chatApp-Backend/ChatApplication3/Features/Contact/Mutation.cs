using ChatApplication.Features.Contacts.Mutations;
using ChatApplication.Models;
using HotChocolate;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChatApplication.Features.Contacts
{

    [Route("api/chatApp/contact")]
    [ApiController]
    public class Mutation
    {
        [HttpPost]
        public async Task<Contact> CreateContact([FromBody] CreateContact.CreateContactRequest request, [Service] IMediator mediator)
        {
            return await mediator.Send(request);
        }

        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateContact([FromRoute] int id, [FromBody] UpdateContact.UpdateContactRequest request, [Service] IMediator mediator)
        //{
        //    // Validate the request ContactId matches the route ID
        //    if (id != request.ContactId)
        //    {
        //        return BadRequest("Route ID and Contact ID do not match.");
        //    }

        //    try
        //    {
        //        // Send the request to Mediator for updating the contact
        //        var updatedContact = await mediator.Send(request);

        //        return Ok(updatedContact);  // Return the updated contact details
        //    }
        //    catch (GraphQLException ex)
        //    {
        //        // Handle not found or validation errors
        //        return BadRequest(ex.Message);
        //    }
        //    catch (DbUpdateException ex)
        //    {
        //        // Handle database update errors, including foreign key violations
        //        return StatusCode(500, "An error occurred while updating the contact: " + ex.Message);
        //    }
        //    catch (Exception ex)
        //    {
        //        // Handle general errors
        //        return StatusCode(500, "An unexpected error occurred: " + ex.Message);
        //    }
        //}

        [HttpPut("{id}")]
        public async Task<Contact> UpdateContact([Service] IMediator mediator, UpdateContact.UpdateContactRequest request)
        {
            return await mediator.Send(request);
        }

        [HttpDelete("{id}")]
        public async Task<bool> DeleteContact([Service] IMediator mediator, DeleteContact.DeleteContactRequest request)
        {
            return await mediator.Send(request);
        }

    }
}
