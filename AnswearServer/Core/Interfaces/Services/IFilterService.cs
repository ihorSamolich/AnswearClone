using Core.ViewModels.Filter;

namespace Core.Interfaces.Services;

public interface IFilterService
{
    Task<FilterVm> GetFilterByIdAsync(int id);
    Task<IEnumerable<FilterVm>> GetAllFiltersAsync();
    Task AddFilterAsync(FilterCreateVm filter);
    Task UpdateFilterAsync(FilterUpdateVm filterVm);
    Task DeleteFilterAsync(int id);
}
