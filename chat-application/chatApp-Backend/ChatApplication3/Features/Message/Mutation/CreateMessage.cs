using MediatR;
using ChatApplication.Models;
using ChatApplication.Data;
using Microsoft.EntityFrameworkCore;

namespace ChatApplication.Features.Messages.Mutations
{
    public static class CreateMessage
    {
        public class CreateMessageRequest : IRequest<Message>
        {
            public string Content { get; set; } = string.Empty;
            public DateTime CreatedAt { get; set; }
            public string SenderId { get; set; }
            public string ReceiverId { get; set; }
            public bool IsNotificationSent { get; set; }
        }

        public class Handler : IRequestHandler<CreateMessageRequest, Message>
        {
            private readonly ChatAppContext _dbContext;

            public Handler(ChatAppContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<Message> Handle(CreateMessageRequest request, CancellationToken cancellationToken)
            {
                // Check if the sender exists
                var senderExists = await _dbContext.Users
                    .AnyAsync(u => u.Uid == request.SenderId, cancellationToken);

                // Check if the receiver exists
                var receiverExists = await _dbContext.Users
                    .AnyAsync(u => u.Uid == request.ReceiverId, cancellationToken);

                if (!senderExists)
                {
                    throw new Exception($"Sender with ID {request.SenderId} does not exist.");
                }

                if (!receiverExists)
                {
                    throw new Exception($"Receiver with ID {request.ReceiverId} does not exist.");
                }

                // Create the message
                var message = new Message
                {
                    Content = request.Content,
                    CreatedAt = request.CreatedAt,
                    SenderId = request.SenderId,
                    ReceiverId = request.ReceiverId,
                    IsNotificationSent = request.IsNotificationSent
                };

                // Add the message to the database
                _dbContext.Messages.Add(message);
                await _dbContext.SaveChangesAsync(cancellationToken);

                // Return the created message
                return message;
            }
        }
    }
}
