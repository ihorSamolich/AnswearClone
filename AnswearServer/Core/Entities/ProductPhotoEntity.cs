using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities;

[Table("tbl_Product_Photos")]
public class ProductPhotoEntity
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;

    public int Priority { get; set; }

    public int ProductVariationId { get; set; }

    public ProductVariationEntity ProductVariation { get; set; } = null!;
}
