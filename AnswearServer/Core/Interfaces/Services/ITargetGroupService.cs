using Core.Entities;
using Core.ViewModels.TargetGroup;

namespace Core.Interfaces.Services;

public interface ITargetGroupService
{
    Task<TargetGroupVm> GetTargetGroupByIdAsync(int id);
    Task<IEnumerable<TargetGroupVm>> GetAllTargetGroupsAsync();
    Task AddTargetGroupAsync(TargetGroupCreateVm targetGroup);
    Task UpdateTargetGroupAsync(TargetGroupUpdateVm targetGroup);
    Task DeleteTargetGroupAsync(int id);
}
