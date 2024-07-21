using Core.Entities.Filters;
using Core.ViewModels.Category;
using System.ComponentModel.DataAnnotations;

namespace Core.ViewModels.Filter;

public class FilterVm
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public int CategoryId { get; set; }
    public ParentCategoryVm Category { get; set; } = null!;
    public ICollection<FilterValueVm> FilterValues { get; set; } = new List<FilterValueVm>();
}

public class FilterValueVm
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
}
