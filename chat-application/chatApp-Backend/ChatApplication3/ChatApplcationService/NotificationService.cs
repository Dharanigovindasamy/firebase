using ChatApplication.ChatApplicationService;
using ChatApplication.Data;
using ChatApplication.Models;
using ChatApplication3.Data.Models;

public interface INotificationService
{
    Task SendNewMessageNotification(Message message, string receiverToken);
    Task HandleFailedNotification(int messageId, string error);
}

public class NotificationService : INotificationService
{
    private readonly IFirebaseService _firebaseService;
    private readonly ChatAppContext _context;
    private readonly ILogger<NotificationService> _logger;

    public NotificationService(
        IFirebaseService firebaseService,
        ChatAppContext context,
        ILogger<NotificationService> logger)
    {
        _firebaseService = firebaseService;
        _context = context;
        _logger = logger;
    }

    public async Task SendNewMessageNotification(Message message, string receiverToken)
    {
        try
        {
            var sender = await _context.Users.FindAsync(message.SenderId);

            var title = $"New message from {sender?.UserName ?? "Someone"}";
            var body = message.Content;
            var messageId = message.Id.ToString();

            await _firebaseService.SendPushNotification(receiverToken, title, body, messageId);

            message.IsNotificationSent = true;
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError($"Failed to send notification for message {message.Id}: {ex.Message}");
            await HandleFailedNotification(message.Id, ex.Message);
        }
    }


    public async Task HandleFailedNotification(int messageId, string error)
    {
        var notification = new NotificationModel
        {
            Id = messageId,
            Status = NotificationStatus.Failed,
            ErrorMessage = error,
            CreatedAt = DateTime.UtcNow
        };

        _context.Notifications.Add(notification);
        await _context.SaveChangesAsync();
    }
}
