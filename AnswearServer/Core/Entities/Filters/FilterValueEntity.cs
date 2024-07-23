using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Core.Entities.Filters;

[Table("tbl_filterValues")]
public class FilterValueEntity
{
    public int Id { get; set; }

    [StringLength(255), Required]
    public string Name { get; set; } = null!;

    [ForeignKey("FilterName")]
    public int FilterNameId { get; set; }
    public virtual FilterNameEntity FilterName { get; set; } = null!;
}
