﻿using Core.Entities.Filters;
using Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories;

public class FilterRepository(
    AppDbContext context
) : IFilterRepository
{
    public async Task<IEnumerable<FilterName>> GetAllAsync()
    {
        return await context.FilterNames.Include(c => c.FilterValues).ToListAsync();
    }

    public async Task<FilterName> GetByIdAsync(int id)
    {
        return await context.FilterNames.Include(c => c.FilterValues).FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task AddAsync(FilterName filter)
    {
        await context.FilterNames.AddAsync(filter);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var filter = await context.FilterNames.FindAsync(id);
        if (filter != null)
        {
            context.FilterNames.Remove(filter);
            await context.SaveChangesAsync();
        }
    }

    public async Task UpdateAsync(FilterName filter)
    {
        context.FilterNames.Update(filter);
        await context.SaveChangesAsync();
    }
}
