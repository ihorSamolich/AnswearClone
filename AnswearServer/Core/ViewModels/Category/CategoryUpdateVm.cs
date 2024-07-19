using System.ComponentModel.DataAnnotations;

namespace Core.ViewModels.Category;

public class CategoryUpdateVm
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public int? TargetGroupId { get; set; }

    public int? ParentId { get; set; }
}
