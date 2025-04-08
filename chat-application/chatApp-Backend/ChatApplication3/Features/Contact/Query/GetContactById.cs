using MediatR;
using Microsoft.EntityFrameworkCore;
using ChatApplication.Models;
using ChatApplication.Data;

namespace ChatApplication.Features.Contacts.Queries
{
    public static class GetContactById
    {
        public class GetContactByIdRequest : IRequest<Contact> 
        {
            public int ContactId { get; set; } 
        }

        public class Handler : IRequestHandler<GetContactByIdRequest, Contact>
        {
            private readonly ChatAppContext _dbContext;

            public Handler(ChatAppContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<Contact> Handle(GetContactByIdRequest request, CancellationToken cancellationToken)
            {
                var contact = await _dbContext.Contacts
                  //  .Include(c => c.OwnerId)
                    //.Include(c => c.OppositeId)
                    .FirstOrDefaultAsync(c => c.ContactId == request.ContactId, cancellationToken);

                if (contact == null)
                    throw new Exception("Contact not found.");

                return contact;
                Console.Write(contact);
           
            }
        }
    }
}
