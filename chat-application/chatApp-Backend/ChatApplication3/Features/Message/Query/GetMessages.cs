using MediatR;
using ChatApplication.Models;
using Microsoft.EntityFrameworkCore;
using ChatApplication.Data;

namespace ChatApplication.Features.Messages.Queries
{
    public class GetMessages
    {
        public class GetMessagesRequest : IRequest<List<Message>> { }

        public class Handler : IRequestHandler<GetMessagesRequest, List<Message>>
        {
            private readonly ChatAppContext _dbContext;

            public Handler(ChatAppContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<List<Message>> Handle(GetMessagesRequest request, CancellationToken cancellationToken)
            {
                return await _dbContext.Messages.Include(m => m.Sender).Include(m => m.Receiver).ToListAsync(cancellationToken);
            }
        }
    }
}
