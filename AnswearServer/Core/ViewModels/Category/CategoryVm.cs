using Core.ViewModels.TargetGroup;

namespace Core.ViewModels.Category;

public class CategoryVm
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Slug { get; set; } = null!;
    public int? TargetGroupId { get; set; }
    public TargetGroupVm TargetGroup { get; set; } = null!;
    public int? ParentId { get; set; }
    public ParentCategoryVm? Parent { get; set; } = null!;
    public List<ChildrenCategoryVm> Childrens { get; set; } = null!;
}

public class ParentCategoryVm
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Slug { get; set; } = null!;
}

public class ChildrenCategoryVm
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string Slug { get; set; } = null!;
}
