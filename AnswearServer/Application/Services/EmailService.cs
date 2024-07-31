using Microsoft.Extensions.Options;
using MimeKit;
using MailKit.Net.Smtp;
using Core.Interfaces.Services;
using Core.SMTP;
using MailKit.Security;
using System.Security.Cryptography.X509Certificates;

namespace Application.Services;
public class EmailService(
    IOptions<EmailConfiguration> options
    ) : IEmailService
{
    private readonly EmailConfiguration emailConfiguration = options.Value;
    public void Send(Message messageData)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("AnswearMail", emailConfiguration.From));
        message.To.Add(new MailboxAddress(messageData.Name, messageData.To));
        message.Subject = "Reset Password";

        string html = File.ReadAllText("Templates/reset_password.html");


        message.Body = new TextPart("html")
        {
            Text = html
        };

        using (var client = new SmtpClient())
        {
            try
            {
                client.Connect(emailConfiguration.SmtpServer, emailConfiguration.Port, SecureSocketOptions.SslOnConnect);
                client.Authenticate(emailConfiguration.UserName, emailConfiguration.Password);
                client.Send(message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error sending: " + ex);
            }
            finally
            {
                client.Disconnect(true);
                client.Dispose();
            }
        }
    }
}
