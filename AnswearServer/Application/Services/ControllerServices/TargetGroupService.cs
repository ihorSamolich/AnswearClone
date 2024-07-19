using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;
using Core.ViewModels.TargetGroup;

namespace Application.Services.ControllerServices;

public class TargetGroupService(
    ITargetGroupRepository repository,
    IMapper mapper,
    ISlugService slugService
    ) : ITargetGroupService
{
    public async Task<TargetGroupVm> GetTargetGroupByIdAsync(int id)
    {
        var entity = await repository.GetByIdAsync(id);

        return mapper.Map<TargetGroupVm>(entity);
    }

    public async Task<IEnumerable<TargetGroupVm>> GetAllTargetGroupsAsync()
    {
        var entities = await repository.GetAllAsync();

        return mapper.Map<List<TargetGroupVm>>(entities);
    }

    public async Task AddTargetGroupAsync(TargetGroupCreateVm targetGroup)
    {
        var newTargetGroup = mapper.Map<TargetGroupEntity>(targetGroup);
        newTargetGroup.Slug = slugService.GenerateSlug(targetGroup.Name);

        await repository.AddAsync(newTargetGroup);
    }

    public async Task UpdateTargetGroupAsync(TargetGroupUpdateVm targetGroup)
    {
        var editedTargetGroup = await repository.GetByIdAsync(targetGroup.Id);

        if (editedTargetGroup != null)
        {
            editedTargetGroup.Name = targetGroup.Name;
            editedTargetGroup.Slug = slugService.GenerateSlug(targetGroup.Name);

            await repository.UpdateAsync(editedTargetGroup);
        }
    }

    public async Task DeleteTargetGroupAsync(int id)
    {
        await repository.DeleteAsync(id);
    }
}
