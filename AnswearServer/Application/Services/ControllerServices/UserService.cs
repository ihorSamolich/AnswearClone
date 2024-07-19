using AutoMapper;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;
using Core.Interfaces;
using Core.ViewModels.User;
using Microsoft.AspNetCore.Identity;
using Core.Entities.Identity;
using Core.ViewModels.Category;
using Core.Constants;

namespace Application.Services.ControllerServices;

public class UserService(
    IUserRepository repository,
    IMapper mapper,
    UserManager<UserEntity> userManager
    ) : IUserService
{
    public async Task<UserVm> GetUserByIdAsync(int id)
    {
        var entity = await repository.GetByIdAsync(id);

        return mapper.Map<UserVm>(entity);
    }

    public async Task<IEnumerable<UserVm>> GetAllUsersAsync()
    {
        var entities = await repository.GetAllAsync();

        return mapper.Map<List<UserVm>>(entities);
    }

    public async Task DeleteUserAsync(int id)
    {
        UserEntity? user = await userManager.FindByIdAsync(id.ToString());

        if (user is null)
            throw new Exception("User not found");

        var result = await userManager.DeleteAsync(user);

        if (!result.Succeeded)
            throw new Exception("Failed to delete user");
    }

    public async Task AddUserAsync(UserCreateVm user)
    {
        UserEntity newUser = mapper.Map<UserEntity>(user);

        var identityResult = await userManager.CreateAsync(newUser, user.Password);

        if (!identityResult.Succeeded)
            throw new Exception("Failed to create user");

        var roleResult = await userManager.AddToRoleAsync(newUser, Roles.User);

        if (!roleResult.Succeeded)
            throw new Exception("Failed to create user");
    }

    public async Task UpdateUserAsync(UserUpdateVm userVm)
    {
        var user = await userManager.FindByIdAsync(userVm.Id.ToString());

        if (user is null)
            throw new Exception("User not found");

        if (!string.IsNullOrEmpty(userVm.FirstName))
            user.FirstName = userVm.FirstName;

        if (!string.IsNullOrEmpty(userVm.LastName))
            user.LastName = userVm.LastName;

        if (!string.IsNullOrEmpty(userVm.UserName))
            user.UserName = userVm.UserName;

        if (!string.IsNullOrEmpty(userVm.Email))
            user.Email = userVm.Email;

        if (!string.IsNullOrEmpty(userVm.PhoneNumber))
            user.PhoneNumber = userVm.PhoneNumber;

        var result = await userManager.UpdateAsync(user);

        if (!result.Succeeded)
            throw new Exception("Failed to update user");

        if (!string.IsNullOrEmpty(userVm.Password))
        {
            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var passwordResult = await userManager.ResetPasswordAsync(user, token, userVm.Password);

            if (!passwordResult.Succeeded)
                throw new Exception("Failed to update password");
        }
    }

}
