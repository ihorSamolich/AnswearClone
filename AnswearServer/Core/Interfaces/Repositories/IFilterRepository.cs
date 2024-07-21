using Core.Entities.Filters;

namespace Core.Interfaces.Repositories;

public interface IFilterRepository
{
    Task<FilterName> GetByIdAsync(int id);
    Task<IEnumerable<FilterName>> GetAllAsync();
    Task AddAsync(FilterName filter);
    Task UpdateAsync(FilterName filter);
    Task DeleteAsync(int id);
}
