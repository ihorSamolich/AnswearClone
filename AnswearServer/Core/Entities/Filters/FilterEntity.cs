using Core.ViewModels.Product;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Filters;

[Table("tbl_filters")]
public class FilterEntity
{
    [ForeignKey("FilterValue")]
    public int FilterValueId { get; set; }
    public virtual FilterValueEntity FilterValue { get; set; } = null!;

    [ForeignKey("ProductVariation")]
    public int ProductVariationId { get; set; }
    public virtual ProductVariationEntity ProductVariation { get; set; } = null!;
}
