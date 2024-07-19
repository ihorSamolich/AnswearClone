using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities;

[Table("tbl_TargetGroup")]
public class TargetGroupEntity
{
    public int Id { get; set; }

    [Required]
    [StringLength(20)]
    public string Name { get; set; } = null!;

    [Required]
    [StringLength(20)]
    public string Slug { get; set; } = null!;

    [DefaultValue(false)]
    public bool IsDeleted { get; set; }

    public virtual ICollection<CategoryEntity> Categories { get; set; } = null!;
}
