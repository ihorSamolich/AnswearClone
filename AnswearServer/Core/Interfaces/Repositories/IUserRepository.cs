using Core.Entities;
using Core.Entities.Identity;

namespace Core.Interfaces.Repositories;

public interface IUserRepository
{
    Task<UserEntity> GetByIdAsync(int id);
    Task<IEnumerable<UserEntity>> GetAllAsync();
    Task AddAsync(UserEntity user);
    Task UpdateAsync(UserEntity user);
    Task DeleteAsync(int id);
}
