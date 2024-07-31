namespace Core.SMTP;

public class Message
{
    public string To { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Body { get; set; } = null!;
}
