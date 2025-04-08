using ChatApplication.Models;
using ChatApplication.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace ChatApplication.Features.Users.Queries
{
    public static class GetUsers
    {
        public class GetUsersRequest : IRequest<List<User>>
        {
        }

        public class Handler : IRequestHandler<GetUsersRequest, List<User>>
        {
            private readonly ChatAppContext _dbContext;

            public Handler(ChatAppContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<List<User>> Handle(GetUsersRequest request, CancellationToken cancellationToken)
            {

                return await _dbContext.Users.ToListAsync(cancellationToken);
            }
        }
    }
}
