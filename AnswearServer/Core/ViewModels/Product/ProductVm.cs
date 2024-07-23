using Core.ViewModels.Category;
using Core.ViewModels.Discount;

namespace Core.ViewModels.Product;

public class ProductVm
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public int CategoryId { get; set; }
    public ChildrenCategoryVm Category { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public ICollection<ProductVariationVm> Variations { get; set; } = new List<ProductVariationVm>();

    //public virtual ICollection<FilterVm> Filters { get; set; } = new List<FilterVm>();
}

public class ProductVariationVm
{
    public int Id { get; set; }
    public string Slug { get; set; } = null!;
    public string ShortDescription { get; set; } = null!;
    public decimal Price { get; set; }
    public int? DiscountValueId { get; set; }
    public DiscountValueVm? DiscountValue { get; set; }
    public ICollection<ProductPhotoVm> Photos { get; set; } = new List<ProductPhotoVm>();
}

public class ProductPhotoVm
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public int Priority { get; set; }
}