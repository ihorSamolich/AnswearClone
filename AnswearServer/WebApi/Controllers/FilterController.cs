using Core.Interfaces.Services;
using Core.ViewModels.Category;
using Core.ViewModels.Filter;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class FilterController
(
    IFilterService service
) : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var filter = await service.GetFilterByIdAsync(id);

        if (filter == null)
        {
            return NotFound();
        }
        return Ok(filter);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var filters = await service.GetAllFiltersAsync();
        return Ok(filters);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await service.DeleteFilterAsync(id);
        return Ok();
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] FilterUpdateVm updateVm)
    {
        try
        {
            await service.UpdateFilterAsync(updateVm);
            return Ok();
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }


    [HttpPost]
    public async Task<IActionResult> Create([FromBody] FilterCreateVm createVm)
    {
        await service.AddFilterAsync(createVm);

        return Ok();
    }
}
