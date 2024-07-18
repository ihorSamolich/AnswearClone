using Core.Interfaces.Services;
using Core.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class TargetGroupController(
    ITargetGroupService service
) : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var targetGroup = await service.GetTargetGroupByIdAsync(id);

        if (targetGroup == null)
        {
            return NotFound();
        }
        return Ok(targetGroup);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var targetGroups = await service.GetAllTargetGroupsAsync();
        return Ok(targetGroups);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] TargetGroupCreateVm createVm)
    {
        await service.AddTargetGroupAsync(createVm);

        return Ok();
    }

    [HttpPut()]
    public async Task<IActionResult> Update([FromBody] TargetGroupUpdateVm updateVm)
    {
        await service.UpdateTargetGroupAsync(updateVm);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await service.DeleteTargetGroupAsync(id);
        return Ok();
    }
}
