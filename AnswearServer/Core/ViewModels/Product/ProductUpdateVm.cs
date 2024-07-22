namespace Core.ViewModels.Product;

public class ProductUpdateVm
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public int CategoryId { get; set; }
    public ICollection<ProductVariationUpdateVm> Variations { get; set; } = new List<ProductVariationUpdateVm>();
}

public class ProductVariationUpdateVm
{
    public int Id { get; set; }
    public string ShortDescription { get; set; } = null!;
    public decimal Price { get; set; }
    public int? DiscountValueId { get; set; }
    public ICollection<string> Photos { get; set; } = new List<string>();
}
