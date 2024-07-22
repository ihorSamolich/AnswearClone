using AutoMapper;
using Core.Entities;
using Core.Entities.Filters;
using Core.Interfaces.Repositories;
using Core.Interfaces.Services;
using Core.ViewModels.Filter;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace Application.Services.ControllerServices;

public class FilterService
    (
    IFilterRepository repository,
    IMapper mapper
    ) : IFilterService
{
    public async Task<IEnumerable<FilterVm>> GetAllFiltersAsync()
    {
        var entities = await repository.GetAllAsync();

        return mapper.Map<List<FilterVm>>(entities);
    }

    public async Task<FilterVm> GetFilterByIdAsync(int id)
    {
        var entity = await repository.GetByIdAsync(id);

        return mapper.Map<FilterVm>(entity);
    }

    public async Task DeleteFilterAsync(int id)
    {
        await repository.DeleteAsync(id);
    }

    public async Task AddFilterAsync(FilterCreateVm filter)
    {
        var newFilter = mapper.Map<FilterNameEntity>(filter);

        var values = new List<FilterValueEntity>();

        foreach (var value in filter.Values)
        {
            values.Add(new FilterValueEntity { Name = value });
        }
        newFilter.FilterValues = values;
        await repository.AddAsync(newFilter);
    }

    public async Task UpdateFilterAsync(FilterUpdateVm filterVm)
    {
        var existingFilter = await repository.GetByIdAsync(filterVm.Id);
        if (existingFilter == null)
        {
            throw new Exception("Filter not found.");
        }

        mapper.Map(filterVm, existingFilter);


        existingFilter.FilterValues.Clear();

        foreach (var value in filterVm.Values)
        {
            existingFilter.FilterValues.Add(new FilterValueEntity { Name = value });
        }

        await repository.UpdateAsync(existingFilter);
    }

}
