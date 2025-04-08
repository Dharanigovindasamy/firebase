using MediatR;
using ChatApplication.Models;
using Microsoft.EntityFrameworkCore;
using ChatApplication.Data;

namespace ChatApplication.Features.Messages.Queries
{
    public class GetMessageById
    {
        public class GetMessageByIdRequest : IRequest<Message>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<GetMessageByIdRequest, Message>
        {
            private readonly ChatAppContext _dbContext;

            public Handler(ChatAppContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<Message> Handle(GetMessageByIdRequest request, CancellationToken cancellationToken)
            {
                var message = await _dbContext.Messages
                    .Include(m => m.Sender)
                    .Include(m => m.Receiver)
                    .FirstOrDefaultAsync(m => m.Id == request.Id, cancellationToken);

                if (message == null)
                    throw new Exception("Message not found.");

                return message;
            }
        }
    }
}
