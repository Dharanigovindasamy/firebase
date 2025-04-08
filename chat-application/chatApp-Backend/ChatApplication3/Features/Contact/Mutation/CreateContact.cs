using ChatApplication.Models;
using ChatApplication.Data;
using MediatR;

namespace ChatApplication.Features.Contacts.Mutations
{
    public static class CreateContact
    {
        public class CreateContactRequest : IRequest<Contact>
        {
            public string Name { get; set; } = string.Empty;
            public string OwnerId { get; set; }
            public string OppositeId { get; set; }
            public string ContactNumber { get; set; } = string.Empty;
        }

        public class Handler : IRequestHandler<CreateContactRequest, Contact>
        {
            private readonly ChatAppContext _dbContext;

            public Handler(ChatAppContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<Contact> Handle(CreateContactRequest request, CancellationToken cancellationToken)
            {
                var contact = new Contact
                {
                    Name = request.Name,
                    OwnerId = request.OwnerId,
                    OppositeId = request.OppositeId,
                    ContactNumber = request.ContactNumber
                };

                _dbContext.Contacts.Add(contact);
                await _dbContext.SaveChangesAsync(cancellationToken);

                return contact;
            }
        }
    }
}
