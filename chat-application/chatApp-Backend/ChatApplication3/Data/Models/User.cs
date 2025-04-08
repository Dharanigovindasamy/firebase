namespace ChatApplication.Models
{
    public class User
    {
        public string Uid { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string UserEmail { get; set; } = string.Empty;
        public string UserPhone { get; set; } = string.Empty;
        public string Password {  get; set; } = string.Empty;
        public string DeviceToken { get; set; }
        public string WebPushToken {  get; set; }

        public List<Contact> Contacts { get; set; }
        //public ICollection<Contact> Contacts { get; set; } = new List<Contact>(); 
        public ICollection<Message> SentMessages { get; set; } = new List<Message>();

       public ICollection<Message> ReceivedMessages { get; set; } = new List<Message>();
        public string? FcmToken { get; internal set; }
    }
}
