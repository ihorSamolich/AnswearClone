using Core.SMTP;

namespace Core.Interfaces.Services;

public interface IEmailService
{
    void Send(Message messageData);
}

