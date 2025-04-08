using MediatR;
using ChatApplication.Models;
using ChatApplication.Data;

namespace ChatApplication.Features.Messages.Mutations
{
    public static class UpdateMessage
    {
        public class UpdateMessageRequest : IRequest<Message>
        {
            public int Id { get; set; }
            public DateTime CreatedAt { get; set; }
            public string Content { get; set; } = string.Empty;
        }

        public class Handler : IRequestHandler<UpdateMessageRequest, Message>
        {
            private readonly ChatAppContext _dbContext;

            public Handler(ChatAppContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<Message> Handle(UpdateMessageRequest request, CancellationToken cancellationToken)
            {
                var message = await _dbContext.Messages.FindAsync(request.Id);

                if (message == null)
                    throw new Exception("Message not found.");

                message.Content = request.Content;
                message.CreatedAt = DateTime.UtcNow;

                await _dbContext.SaveChangesAsync(cancellationToken);

                return message;
            }
        }
    }
}
