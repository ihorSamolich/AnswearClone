using Core.Entities.Discount;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities;

[Table("tbl_Products")]
public class Product
{
    public int Id { get; set; }

    [StringLength(255), Required]
    public string Name { get; set; } = null!;

    [StringLength(500)]
    public string Description { get; set; } = null!;

    public int CategoryId { get; set; }
    public CategoryEntity Category { get; set; } = null!;

    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }

    public ICollection<ProductPhotoEntity> Photos { get; set; } = new List<ProductPhotoEntity>();

    public int? DiscountValueId { get; set; }
    public DiscountValue? DiscountValue { get; set; }
}
