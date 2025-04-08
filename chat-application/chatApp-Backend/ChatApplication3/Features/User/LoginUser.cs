using ChatApplication.Models;
using Microsoft.EntityFrameworkCore;
using ChatApplication.Data;

namespace ChatApplication.Features
{
    public class LoginUser
    {
        private readonly ChatAppContext _dbContext;

        public LoginUser(ChatAppContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User?> loginAsyncAuthenticate(string uid, string userEmail, string userName)
        {

            return await _dbContext.Users
                .FirstOrDefaultAsync(user => user.Uid == uid && user.UserEmail == userEmail && user.UserName == userName);
        }
    }
}
