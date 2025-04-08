using ChatApplication.Data;
using MediatR;

namespace ChatApplication.Features.Contacts.Mutations
{
    public static class DeleteContact
    {
        public class DeleteContactRequest : IRequest<bool>
        {
            public int ContactId { get; set; }
        }

        public class Handler : IRequestHandler<DeleteContactRequest, bool>
        {
            private readonly ChatAppContext _dbContext;

            public Handler(ChatAppContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<bool> Handle(DeleteContactRequest request, CancellationToken cancellationToken)
            {
                var contact = await _dbContext.Contacts.FindAsync(request.ContactId);

                if (contact == null)
                    throw new GraphQLException("Contact not found.");

                _dbContext.Contacts.Remove(contact);
                await _dbContext.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}
