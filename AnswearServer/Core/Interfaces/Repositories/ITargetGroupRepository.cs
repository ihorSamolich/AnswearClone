using Core.Entities;

namespace Core.Interfaces.Repositories;

public interface ITargetGroupRepository
{
    Task<TargetGroupEntity> GetByIdAsync(int id);
    Task<IEnumerable<TargetGroupEntity>> GetAllAsync();
    Task AddAsync(TargetGroupEntity targetGroup);
    Task UpdateAsync(TargetGroupEntity targetGroup);
    Task DeleteAsync(int id);
}
