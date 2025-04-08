using ChatApplication.Models;

public class Contact
{
    public int ContactId { get; set; }
    public string Name { get; set; } = string.Empty;

    public string ContactNumber {  get; set; } = string.Empty;

    public string OwnerId { get; set; }
    public string OppositeId { get; set; }

    public User Owner { get; set; }
    public User Opposite { get; set; }

   // public ICollection<Message> ReceivedMessages { get; set; } = new List<Message>();
}
