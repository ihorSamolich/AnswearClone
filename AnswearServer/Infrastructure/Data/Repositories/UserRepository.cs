using Core.Entities.Identity;
using Core.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories;

public class UserRepository(
    AppDbContext context
) : IUserRepository
{
    public async Task AddAsync(UserEntity user)
    {
        await context.Users.AddAsync(user);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var user = await context.Users.FindAsync(id);
        if (user != null)
        {
            context.Users.Remove(user);
            await context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<UserEntity>> GetAllAsync()
    {
        return await context.Users
           .Include(c => c.UserRoles)
           .ToListAsync();
    }

    public async Task<UserEntity> GetByIdAsync(int id)
    {
        return await context.Users
           .Include(c => c.UserRoles)
           .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task UpdateAsync(UserEntity user)
    {
        context.Users.Update(user);
        await context.SaveChangesAsync();
    }
}
