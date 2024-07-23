using Core.Entities.Filters;

namespace Core.Interfaces.Repositories;

public interface IFilterRepository
{
    Task<FilterNameEntity> GetByIdAsync(int id);
    Task<IEnumerable<FilterNameEntity>> GetAllAsync();
    Task AddAsync(FilterNameEntity filter);
    Task UpdateAsync(FilterNameEntity filter);
    Task DeleteAsync(int id);
}
