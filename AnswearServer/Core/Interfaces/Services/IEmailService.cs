using Core.SMTP;

namespace Core.Interfaces.Services;

public interface IEmailService
{
    Task SendAsync(Message messageData);
}

