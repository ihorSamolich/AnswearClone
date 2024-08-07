using Microsoft.AspNetCore.Http;

namespace Core.ViewModels.Product;

public class ProductCreateVm
{
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public int CategoryId { get; set; }
    public ICollection<int>? Filters { get; set; } = new List<int>();
    public ICollection<ProductVariationCreateVm> Variations { get; set; } = new List<ProductVariationCreateVm>();
}

public class ProductVariationCreateVm
{
    public string ShortDescription { get; set; } = null!;
    public decimal Price { get; set; }
    public int? DiscountValueId { get; set; }
    public ICollection<IFormFile>? Photos { get; set; } = new List<IFormFile>();
}