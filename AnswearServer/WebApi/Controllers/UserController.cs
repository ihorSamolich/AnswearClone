using Core.Interfaces.Services;
using Core.ViewModels.Category;
using Core.ViewModels.TargetGroup;
using Core.ViewModels.User;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class UserController(
    IUserService service
) : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var user = await service.GetUserByIdAsync(id);

        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await service.GetAllUsersAsync();
        return Ok(users);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] UserCreateVm createVm)
    {
        await service.AddUserAsync(createVm);

        return Ok();
    }

    [HttpPut()]
    public async Task<IActionResult> Update([FromBody] UserUpdateVm createVm)
    {
        await service.UpdateUserAsync(createVm);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await service.DeleteUserAsync(id);
        return Ok();
    }
}
