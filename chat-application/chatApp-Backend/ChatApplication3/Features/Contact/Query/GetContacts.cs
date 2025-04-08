using MediatR;
using Microsoft.EntityFrameworkCore;
using ChatApplication.Models;
using ChatApplication.Data;

namespace ChatApplication.Features.Contacts.Queries
{
    public static class GetContacts
    {
        public class GetContactsRequest : IRequest<List<Contact>> 
        {
        }

        public class Handler : IRequestHandler<GetContactsRequest, List<Contact>>
        {
            private readonly ChatAppContext _dbContext;

            public Handler(ChatAppContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<List<Contact>> Handle(GetContactsRequest request, CancellationToken cancellationToken)
            {
                return await _dbContext.Contacts
                    .ToListAsync(cancellationToken);
            }

        }
    }
}
