using ChatApplication.Data.Configurations;
using ChatApplication.Models;
using ChatApplication3.Data.Configurations;
using ChatApplication3.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatApplication.Data
{
    public class ChatAppContext : DbContext
    {
        
        public DbSet<User> Users { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<NotificationModel> Notifications { get; set; }

       
        public ChatAppContext(DbContextOptions<ChatAppContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new ContactConfiguration());
            modelBuilder.ApplyConfiguration(new MessageConfiguration());
            modelBuilder.ApplyConfiguration(new NotificationModelConfiguration());

            base.OnModelCreating(modelBuilder);
        }
    }
}
