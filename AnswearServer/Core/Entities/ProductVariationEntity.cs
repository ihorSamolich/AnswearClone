using Core.Entities.Discount;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Core.Entities.Filters;
using Microsoft.EntityFrameworkCore;

namespace Core.Entities;

[Table("tbl_ProductVariations")]
public class ProductVariationEntity
{
    public int Id { get; set; }

    [Required]
    [StringLength(200)]
    public string Slug { get; set; } = null!;

    public int ProductId { get; set; }
    public ProductEntity Product { get; set; } = null!;

    [StringLength(300)]
    public string ShortDescription { get; set; } = null!;

    [Column(TypeName = "decimal(18,2)")]
    public decimal Price { get; set; }

    public int? DiscountValueId { get; set; }
    [DeleteBehavior(DeleteBehavior.SetNull)]
    public DiscountValueEntity? DiscountValue { get; set; }

    public ICollection<ProductPhotoEntity> Photos { get; set; } = new List<ProductPhotoEntity>();
    public virtual ICollection<FilterEntity> Filters { get; set; } = new List<FilterEntity>();

}
