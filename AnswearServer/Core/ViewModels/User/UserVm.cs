namespace Core.ViewModels.User;

public class UserVm
{
    public int Id { get; set; }
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;

    public string UserName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string PhoneNumber { get; set; } = null!;
    public string LockoutEnd { get; set; } = null!;
    public bool EmailConfirmed { get; set; }
}