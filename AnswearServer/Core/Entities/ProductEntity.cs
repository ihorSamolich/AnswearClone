using Core.Entities.Discount;
using Core.Entities.Filters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities;

[Table("tbl_Products")]
public class ProductEntity
{
    public int Id { get; set; }

    [StringLength(255), Required]
    public string Name { get; set; } = null!;

    [StringLength(1000)]
    public string Description { get; set; } = null!;

    public int CategoryId { get; set; }
    public CategoryEntity Category { get; set; } = null!;

    //[Required]
    //[StringLength(200)]
    //public string Slug { get; set; } = null!;

    public ICollection<ProductVariationEntity> Variations { get; set; } = new List<ProductVariationEntity>();
}
