using Core.Entities;

namespace Core.Interfaces.Repositories;
public interface ICategoryRepository
{
    Task<CategoryEntity> GetByIdAsync(int id);
    Task<IEnumerable<CategoryEntity>> GetAllAsync();
    Task AddAsync(CategoryEntity category);
    Task UpdateAsync(CategoryEntity category);
    Task DeleteAsync(int id);
}
