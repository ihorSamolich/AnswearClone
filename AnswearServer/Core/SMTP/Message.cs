

namespace Core.SMTP;

public class Message
{
    public string Subject { get; set; }
    public string Body { get; set; }
    public string FilePath { get; set; }
    public string To { get; set; }
    public string Name { get; set; }
}
