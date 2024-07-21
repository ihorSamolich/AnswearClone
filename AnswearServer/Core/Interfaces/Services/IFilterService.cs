using Core.ViewModels.Filter;

namespace Core.Interfaces.Services;

public interface IFilterService
{
    Task<FilterVm> GetTargetGroupByIdAsync(int id);
    Task<IEnumerable<FilterVm>> GetAllTargetGroupsAsync();
    //Task AddTargetGroupAsync(TargetGroupCreateVm targetGroup);
    //Task UpdateTargetGroupAsync(TargetGroupUpdateVm targetGroup);
    Task DeleteTargetGroupAsync(int id);
}
