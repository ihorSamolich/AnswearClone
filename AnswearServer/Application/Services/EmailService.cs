using Microsoft.Extensions.Options;
using MimeKit;
using MailKit.Net.Smtp;
using Core.Interfaces.Services;
using Core.SMTP;
using MailKit.Security;

namespace Application.Services;
public class EmailService(
    IOptions<EmailConfiguration> options
    ) : IEmailService
{
    private readonly EmailConfiguration emailConfiguration = options.Value;
    public async Task SendAsync(Message messageData)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("AnswearMail", emailConfiguration.From));
        message.To.Add(new MailboxAddress(messageData.Name, messageData.To));
        message.Subject = "Reset Password";

        string html = await File.ReadAllTextAsync("Templates/reset_password.html");

        html = html.Replace("{Email}", messageData.To);
        html = html.Replace("{Link}", messageData.Body);

        message.Body = new TextPart("html")
        {
            Text = html
        };

        using (var client = new SmtpClient())
        {
            try
            {
                await client.ConnectAsync(emailConfiguration.SmtpServer, emailConfiguration.Port, SecureSocketOptions.SslOnConnect);
                await client.AuthenticateAsync(emailConfiguration.UserName, emailConfiguration.Password);
                await client.SendAsync(message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error sending: " + ex);
            }
            finally
            {
                await client.DisconnectAsync(true);
                client.Dispose();
            }
        }
    }
}
