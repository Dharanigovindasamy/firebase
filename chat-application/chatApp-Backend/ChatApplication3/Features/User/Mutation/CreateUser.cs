using HotChocolate;
using MediatR;
using ChatApplication.Data;
using ChatApplication.Models;
using static ChatApplication.Features.Contacts.Mutations.CreateContact;


namespace ChatApplication.Features
{
    public static class CreateUser
    {
        public class CreateUserRequest : IRequest<User>
        {
            public required string Uid { get; set; }
            public required string UserName { get; set; }
            public required string UserEmail { get; set; }
            public required string UserPhone { get; set; }
            public required string Password { get; set; }

            public List<CreateContactRequest> Contacts { get; set; } = new List<CreateContactRequest>();
        }

        public class Handler : IRequestHandler<CreateUserRequest, User>
        {
            private readonly ChatAppContext _dbContext;

            public Handler(ChatAppContext dbContext)
            {
                _dbContext = dbContext;
            }

            public async Task<User> Handle(CreateUserRequest request, CancellationToken cancellationToken)
            {
                var user = new User
                {
                    Uid = request.Uid,
                    UserName = request.UserName,
                    UserEmail = request.UserEmail,
                    UserPhone = request.UserPhone,
                    Password = request.Password,
                    Contacts = new List<Contact>()
                };

                foreach (var contactRequest in request.Contacts)
                {
                    var contact = new Contact
                    {
                        Name = contactRequest.Name,
                        OwnerId = contactRequest.OwnerId,
                        OppositeId = contactRequest.OppositeId,
                        Owner = user
                    };
                    user.Contacts.Add(contact);
                }

                //var owner = await _dbContext.Users.FindAsync(contactRequest.OwnerId);
                //var opposite = await _dbContext.Users.FindAsync(contactRequest.OppositeId);

                //if (owner == null || opposite == null)
                //{
                //    throw new Exception("Contact reference is invalid. Owner or Opposite user not found.");
                //}

                //user.Contacts.Add(contact);
            
            _dbContext.Users.Add(user);
                await _dbContext.SaveChangesAsync(cancellationToken);

                return user;
            }

        }
    }

}