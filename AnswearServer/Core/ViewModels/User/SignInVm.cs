namespace Core.ViewModels.User;

public class SignInVm
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}

public class GoogleSignInVm
{
    public string Credential { get; set; } = null!;
}