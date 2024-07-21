using AutoMapper;
using Core.Interfaces.Repositories;
using Core.Interfaces;
using Core.Interfaces.Services;
using Core.ViewModels.Filter;
using Core.ViewModels.TargetGroup;

namespace Application.Services.ControllerServices;

public class FilterService
    (
    IFilterRepository repository,
    IMapper mapper
    ) : IFilterService
{
    public async Task<IEnumerable<FilterVm>> GetAllTargetGroupsAsync()
    {
        var entities = await repository.GetAllAsync();

        return mapper.Map<List<FilterVm>>(entities);
    }

    public async Task<FilterVm> GetTargetGroupByIdAsync(int id)
    {
        var entity = await repository.GetByIdAsync(id);

        return mapper.Map<FilterVm>(entity);
    }

    public async Task DeleteTargetGroupAsync(int id)
    {
        await repository.DeleteAsync(id);
    }

}
