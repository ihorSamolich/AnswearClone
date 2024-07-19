using Core.Entities;
using Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories;

public class TargetGroupRepository(
    AppDbContext context
    ) : ITargetGroupRepository
{
    public async Task<TargetGroupEntity> GetByIdAsync(int id)
    {
        return await context.TargetGroups.FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<IEnumerable<TargetGroupEntity>> GetAllAsync()
    {
        return await context.TargetGroups.Where(c => !c.IsDeleted).ToListAsync();
    }

    public async Task AddAsync(TargetGroupEntity targetGroup)
    {
        await context.TargetGroups.AddAsync(targetGroup);
        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(TargetGroupEntity targetGroup)
    {
        context.TargetGroups.Update(targetGroup);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var targetGroup = await context.TargetGroups.FindAsync(id);
        if (targetGroup != null)
        {
            targetGroup.IsDeleted = true;
            context.TargetGroups.Update(targetGroup);
            await context.SaveChangesAsync();
        }
    }
}
