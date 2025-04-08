using HotChocolate;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ChatApplication.Data;
using ChatApplication.Models;

namespace ChatApplication.Features.Users.Mutation
{
    public static class DeleteUser
    {
        public class DeleteUserRequest : IRequest<bool>
        {
            public string Uid { get; set; }
        }

        public class Handler : IRequestHandler<DeleteUserRequest, bool>
        {
            private readonly IDbContextFactory<ChatAppContext> _dbContextFactory;

            public Handler(IDbContextFactory<ChatAppContext> dbContextFactory)
            {
                _dbContextFactory = dbContextFactory;
            }

            public async Task<bool> Handle(DeleteUserRequest request, CancellationToken cancellationToken)
            {
               
                using var dbContext = _dbContextFactory.CreateDbContext();

                var user = await dbContext.Users.FindAsync(request.Uid);

                if (user == null)
                    throw new GraphQLException("User not found.");

                dbContext.Users.Remove(user);
                await dbContext.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}
