using MediatR;
using Microsoft.EntityFrameworkCore;
using ChatApplication.Models;
using ChatApplication.Data;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace ChatApplication.Features.Contacts.Queries
{
    public static class GetContactByUid
    {
        public class GetContactByUidRequest : IRequest<List<Contact>>
        {
            public string OwnerId { get; set; }
        }

        public class Handler : IRequestHandler<GetContactByUidRequest, List<Contact>>
        {
            private readonly ChatAppContext _dbContext;

            public Handler(ChatAppContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<List<Contact>> Handle(GetContactByUidRequest request, CancellationToken cancellationToken)
            {
                var contacts = await _dbContext.Contacts
                    .Where(c => c.OwnerId == request.OwnerId)
                    .ToListAsync(cancellationToken);

                if (contacts == null || contacts.Count == 0)
                    throw new Exception("No contacts found for the given user.");

                return contacts;
            }
        }
    }
}
