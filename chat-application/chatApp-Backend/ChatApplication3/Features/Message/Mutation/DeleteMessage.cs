using ChatApplication.Data;
using MediatR;

namespace ChatApplication.Features.Messages.Mutations
{
    public static class DeleteMessage
    {
        public class DeleteMessageRequest : IRequest<bool>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<DeleteMessageRequest, bool>
        {
            private readonly ChatAppContext _dbContext;

            public Handler(ChatAppContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<bool> Handle(DeleteMessageRequest request, CancellationToken cancellationToken)
            {
                var message = await _dbContext.Messages.FindAsync(request.Id);
                if (message == null)
                    return false;

                _dbContext.Messages.Remove(message);
                await _dbContext.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}
