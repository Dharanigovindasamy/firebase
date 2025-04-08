using ChatApplication.Models;
using ChatApplication.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatApplication.Features.Contacts.Mutations
{
    public static class UpdateContact
    {
        public class UpdateContactRequest : IRequest<Contact>
        {
            public int ContactId { get; set; }
            public string Name { get; set; } = string.Empty;
            public string OwnerId { get; set; }
            public string OppositeId { get; set; }
        }

        public class Handler : IRequestHandler<UpdateContactRequest, Contact>
        {
            private readonly ChatAppContext _dbContext;

            public Handler(ChatAppContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<Contact> Handle(UpdateContactRequest request, CancellationToken cancellationToken)
            {
                // Find the contact by ContactId
                var contact = await _dbContext.Contacts.FindAsync(request.ContactId);

                if (contact == null)
                    throw new GraphQLException("Contact not found.");

               
                var ownerExists = await _dbContext.Users.AnyAsync(u => u.Uid == request.OwnerId, cancellationToken);
                if (!ownerExists)
                    throw new GraphQLException($"Owner with Id {request.OwnerId} not found.");

                var oppositeExists = await _dbContext.Users.AnyAsync(u => u.Uid == request.OppositeId, cancellationToken);
                if (!oppositeExists)
                    throw new GraphQLException($"Opposite contact with Id {request.OppositeId} not found.");

                contact.Name = request.Name;
                contact.OwnerId = request.OwnerId;
                contact.OppositeId = request.OppositeId;

                await _dbContext.SaveChangesAsync(cancellationToken);

                return contact;
            }
        }
    }
}

