using HotChocolate;
using MediatR;
using ChatApplication.Data;
using ChatApplication.Models;

namespace ChatApplication.Features
{
    public static class UpdateUser
    {
        public class UpdateUserRequest : IRequest<User>
        {
            public int Uid { get; set; }
            public required string UserName { get; set; }
          
        }

        public class Handler : IRequestHandler<UpdateUserRequest, User>
        {
            private readonly ChatAppContext _dbContext;

            public Handler(ChatAppContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<User> Handle(UpdateUserRequest request, CancellationToken cancellationToken)
            {
                var user = await _dbContext.Users.FindAsync(request.Uid);

                if (user == null)
                    throw new GraphQLException("User not found.");

                user.UserName = request.UserName;

                await _dbContext.SaveChangesAsync(cancellationToken);

                return user;
            }
        }

    }
}
