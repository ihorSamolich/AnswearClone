using Core.Entities;

namespace Core.Interfaces.Repositories;

public interface IProductRepository
{
    Task<ProductEntity> GetByIdAsync(int id);
    Task<IEnumerable<ProductEntity>> GetAllAsync();
    Task AddAsync(ProductEntity product);
    Task UpdateAsync(ProductEntity product);
    Task DeleteAsync(int id);
}
