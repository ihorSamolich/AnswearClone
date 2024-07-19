
using Core.Entities;
using Core.Interfaces.Repositories;
using Core.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories;

public class CategoryRepository(
    AppDbContext context
) : ICategoryRepository
{
    public async Task AddAsync(CategoryEntity category)
    {
        await context.Categories.AddAsync(category);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var category = await context.Categories.FindAsync(id);
        if (category != null)
        {
            category.IsDeleted = true;
            context.Categories.Update(category);
            await context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<CategoryEntity>> GetAllAsync()
    {
        return await context.Categories
            .Include(c => c.TargetGroup)
            .Include(c => c.Parent)
            .Include(c => c.Childrens)
            .Where(c => !c.IsDeleted)
            .ToListAsync();
    }

    public async Task<CategoryEntity> GetByIdAsync(int id)
    {
        return await context.Categories
            .Include(c => c.TargetGroup)
            .Include(c => c.Parent)
            .Include(c => c.Childrens)
            .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task UpdateAsync(CategoryEntity category)
    {
        context.Categories.Update(category);
        await context.SaveChangesAsync();
    }
}
