using Core.Interfaces.Services;
using Core.ViewModels.Discount;
using Core.ViewModels.Filter;
using Core.ViewModels.Product;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class ProductController(
    IProductService service
 ) : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await service.GetProductByIdAsync(id);

        if (product == null)
        {
            return NotFound();
        }
        return Ok(product);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await service.GetAllProductsAsync();
        return Ok(products);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await service.DeleteProductAsync(id);
        return Ok();
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] ProductCreateVm createVm)
    {
        await service.AddProductAsync(createVm);

        return Ok();
    }

    [HttpPut()]
    public async Task<IActionResult> Update([FromForm] ProductUpdateVm updateVm)
    {
        await service.UpdateProductAsync(updateVm);

        return Ok();
    }
}
