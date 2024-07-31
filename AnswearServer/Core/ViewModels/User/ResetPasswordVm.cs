using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.ViewModels.User;

public class ForgotPasswordVm
{
    public string Email { get; set; } = null!;
}

public class ResetPasswordVm
{
    public string Email { get; set; } = null!;
    public string Token { get; set; } = null!;
    public string Password { get; set; } = null!;
}
