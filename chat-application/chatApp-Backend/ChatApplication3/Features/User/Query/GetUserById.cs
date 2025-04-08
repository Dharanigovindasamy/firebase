using ChatApplication.Models;
using ChatApplication.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatApplication.Features
{
    public static class GetUserById
    {
        public class GetUserByIdRequest : IRequest<User>
        {
            public string Uid { get; set; }
        }

        public class Handler : IRequestHandler<GetUserByIdRequest, User>
        {
            private readonly ChatAppContext _dbContext;

            public Handler(ChatAppContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<User> Handle(GetUserByIdRequest request, CancellationToken cancellationToken)
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Uid == request.Uid, cancellationToken);

                if (user == null)
                {
                    // Add some logging here for debugging
                    Console.WriteLine($"User with ID {request.Uid} not found.");
                    throw new GraphQLException("User not found.");
                }

                return user;
            }
        }
    }
}
