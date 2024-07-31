
namespace Core.SMTP;

public class MailSettings
{
    public string EmailId { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string UserName { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string Host { get; set; } = null!;
    public int Port { get; set; }
    public bool UseSSL { get; set; }
}
