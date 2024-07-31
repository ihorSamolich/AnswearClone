using Core.ViewModels.Category;
using Core.ViewModels.User;

namespace Core.Interfaces.Services;

public interface IUserService
{
    Task<UserVm> GetUserByIdAsync(int id);
    Task<IEnumerable<UserVm>> GetAllUsersAsync();
    Task AddUserAsync(UserCreateVm user);
    Task UpdateUserAsync(UserUpdateVm user);
    Task DeleteUserAsync(int id);
    Task<string> SignInAsync(SignInVm model);
    Task<string> GoogleSignInAsync(GoogleSignInVm model);
    Task BlockUserAsync(int id, TimeSpan lockoutDuration);
    Task GeneratePasswordResetTokenAsync(string email);
    Task ResetPasswordAsync(string email, string token, string newPassword);
}
