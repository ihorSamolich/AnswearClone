
namespace Core.ViewModels.Category;

public class CategoryCreateVm
{
    public string Name { get; set; } = null!;

    public int? TargetGroupId { get; set; }

    public int? ParentId { get; set; }
}
