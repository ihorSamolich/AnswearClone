using Core.Interfaces.Services;
using Core.ViewModels.Discount;
using Core.ViewModels.TargetGroup;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class DiscountController (
    IDiscountService service
):  ControllerBase
{
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var discount = await service.GetDiscountByIdAsync(id);

        if (discount == null)
        {
            return NotFound();
        }
        return Ok(discount);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var discounts = await service.GetAllDiscountAsync();
        return Ok(discounts);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] DiscountCreateVm createVm)
    {
        await service.AddDiscountAsync(createVm);

        return Ok();
    }

    [HttpPut()]
    public async Task<IActionResult> Update([FromForm] DiscountUpdateVm updateVm)
    {
        await service.UpdateDiscountAsync(updateVm);

        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await service.DeleteDiscountAsync(id);
        return Ok();
    }


}
