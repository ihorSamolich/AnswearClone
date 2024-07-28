using Application.Services;
using Core.Interfaces.Services;
using Core.ViewModels.User;
using Google.Apis.Auth;
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

    [HttpPost]
    public async Task<IActionResult> SignIn([FromForm] SignInVm model)
    {
        try
        {
            var token = await service.SignInAsync(model);

            return Ok(new
            {
                Token = token
            });
        }
        catch (UnauthorizedAccessException e)
        {
            return Unauthorized(e.Message);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> GoogleSignIn([FromForm] GoogleSignInVm model)
    {
        try
        {
            var token = await service.GoogleSignInAsync(model);

            return Ok(new
            {
                Token = token
            });
        }
        catch (InvalidJwtException e)
        {
            return Unauthorized(e.Message);
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> BlockUser([FromForm] int id, int days = 10)
    {
        try
        {
            await service.BlockUserAsync(id, TimeSpan.FromDays(days));

            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, e.Message);
        }
    }
}
