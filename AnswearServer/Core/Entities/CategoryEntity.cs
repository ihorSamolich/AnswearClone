using Core.Entities.Filters;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

[Table("tbl_Categories")]
public class CategoryEntity
{
    public int Id { get; set; }

    [Required]
    [StringLength(200)]
    public string Name { get; set; } = null!;

    [Required]
    [StringLength(200)]
    public string Slug { get; set; } = null!;

    [DefaultValue(false)]
    public bool IsDeleted { get; set; }

    public int? TargetGroupId { get; set; }
    public TargetGroupEntity TargetGroup { get; set; } = null!;

    public int? ParentId { get; set; }
    public CategoryEntity Parent { get; set; } = null!;

    public virtual ICollection<CategoryEntity> Childrens { get; set; } = null!;

    public virtual ICollection<FilterNameEntity> FilterNames { get; set; } = new List<FilterNameEntity>();
}
