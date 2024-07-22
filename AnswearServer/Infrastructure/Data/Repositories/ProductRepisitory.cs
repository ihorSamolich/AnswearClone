using Core.Entities;
using Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories;

public class ProductRepisitory(
    AppDbContext context
) : IProductRepository
{
    public async Task AddAsync(ProductEntity product)
    {
        await context.Products.AddAsync(product);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var product = await context.Products.FindAsync(id);
        if (product != null)
        {
            context.Products.Remove(product);
            await context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<ProductEntity>> GetAllAsync()
    {
        return await context.Products
            .Include(c => c.Category)
            .Include(c => c.Variations)
                .ThenInclude(x => x.Photos)
            .Include(p => p.Variations)
                .ThenInclude(v => v.DiscountValue)
            .ToListAsync();
    }

    public async Task<ProductEntity> GetByIdAsync(int id)
    {
        return await context.Products
         .Include(p => p.Category)
         .Include(p => p.Variations)
             .ThenInclude(v => v.DiscountValue)
         .Include(p => p.Variations)
             .ThenInclude(v => v.Photos)
         .FirstOrDefaultAsync(p => p.Id == id);

    }

    public async Task UpdateAsync(ProductEntity product)
    {
        context.Products.Update(product);
        await context.SaveChangesAsync();
    }
}
