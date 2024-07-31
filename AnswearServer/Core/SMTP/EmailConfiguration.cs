using Microsoft.Extensions.Configuration;

namespace Core.SMTP;

public class EmailConfiguration
{

    //public EmailConfiguration(IConfiguration configuration)
    //{
    //    From = configuration["MailSettings:From"];
    //    SmtpServer = configuration["MailSettings:SmtpServer"];
    //    Port = int.Parse(configuration["MailSettings:Port"]);
    //    UserName = configuration["MailSettings:UserName"];
    //    Password = configuration["MailSettings:Password"];

    //}

    public string From { get; set; } = null!;
    public string SmtpServer { get; set; } = null!;
    public int Port { get; set; }
    public string UserName { get; set; } = null!;
    public string Password { get; set; } = null!;
}
