namespace Core.ViewModels.Filter;
public class FilterCreateVm
{
    public string Name { get; set; } = null!;
    public int CategoryId { get; set; }
    public IEnumerable<string> Values { get; set; }
}
