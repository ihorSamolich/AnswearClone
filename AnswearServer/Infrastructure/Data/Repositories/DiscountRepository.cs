using Core.Entities;
using Core.Entities.Discount;
using Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repositories;

public class DiscountRepository(
    AppDbContext context
    ) : IDiscountRepository
{
    public async Task<Discount> GetByIdAsync(int id)
    {
        return await context.Discounts.FirstOrDefaultAsync(d => d.Id == id);
    }

    public async Task<IEnumerable<Discount>> GetAllAsync()
    {
        return await context.Discounts
            .Include(d=>d.DiscountValues)
            .ToListAsync();
    }

    public async Task AddAsync(Discount discount)
    {
        await context.Discounts.AddAsync(discount);
        await context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Discount discount)
    {
        context.Discounts.Update(discount);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var discount = await context.Discounts.FindAsync(id);
        if (discount != null)
        {
            context.Discounts.Remove(discount);
            await context.SaveChangesAsync();
        }
    }
}
