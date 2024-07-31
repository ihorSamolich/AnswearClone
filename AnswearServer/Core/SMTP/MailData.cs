using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.SMTP;

public class MailData
{
    public string EmailToId { get; set; } = null!;
    public string EmailToName { get; set; } = null!;
    public string EmailSubject { get; set; } = null!;
    public string EmailBody { get; set; } = null!;
}
