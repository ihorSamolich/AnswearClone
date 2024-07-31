using Application.Services;
using Core.Interfaces.Services;
using Core.SMTP;
using Core.ViewModels.Errors;
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
        try
        {
            var user = await service.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound(new ErrorResponse { Message = "User not found", StatusCode = 404 });
            }
            return Ok(user);
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var users = await service.GetAllUsersAsync();
            return Ok(users);
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] UserCreateVm createVm)
    {
        try
        {
            await service.AddUserAsync(createVm);
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }

    [HttpPut()]
    public async Task<IActionResult> Update([FromBody] UserUpdateVm createVm)
    {
        try
        {
            await service.UpdateUserAsync(createVm);
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await service.DeleteUserAsync(id);
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }

    [HttpPost]
    public async Task<IActionResult> SignIn([FromBody] SignInVm model)
    {
        try
        {
            var token = await service.SignInAsync(model);
            return Ok(new { Token = token });
        }
        catch (UnauthorizedAccessException e)
        {
            return Unauthorized(new ErrorResponse { Message = e.Message, StatusCode = 401 });
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }

    [HttpPost]
    public async Task<IActionResult> GoogleSignIn([FromForm] GoogleSignInVm model)
    {
        try
        {
            var token = await service.GoogleSignInAsync(model);
            return Ok(new { Token = token });
        }
        catch (InvalidJwtException e)
        {
            return Unauthorized(new ErrorResponse { Message = e.Message, StatusCode = 401 });
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }

    [HttpPost("{id}")]
    public async Task<IActionResult> BlockUser(int id)
    {
        try
        {
            await service.BlockUserAsync(id, TimeSpan.FromDays(10));
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }

    [HttpPost]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordVm model)
    {
        try
        {
            await service.GeneratePasswordResetTokenAsync(model.Email);
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(500, new ErrorResponse { Message = e.Message, StatusCode = 500 });
        }
    }
}
