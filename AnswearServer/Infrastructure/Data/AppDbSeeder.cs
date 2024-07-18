using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Data;

public class AppDbSeeder(
    AppDbContext context,
    IConfiguration configuration,
    ISlugService slugService
    ) : IAppDbSeeder
{
    public async Task SeedAsync()
    {
        await context.Database.MigrateAsync();

        using var transaction = await context.Database.BeginTransactionAsync();

        try
        {
            if (!await context.TargetGroups.AnyAsync())
                await CreateTargetGroupsAsync();

            await transaction.CommitAsync();
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
        }
    }

    private async Task CreateTargetGroupsAsync()
    {
        var defaultTargetGroups = configuration?
                    .GetSection("DefaultSeedData:TargetGroups")
                    .Get<string[]>();

        if (defaultTargetGroups is null)
            throw new Exception("DefaultSeedData:TargetGroups is invalid");

        var targetGroups = new List<TargetGroupEntity>();

        foreach (var group in defaultTargetGroups)
        {
            var targetGroup = new TargetGroupEntity
            {
                Name = group,
                Slug = slugService.GenerateSlug(group),
            };

            targetGroups.Add(targetGroup);
        }

        context.TargetGroups.AddRange(targetGroups);
        await context.SaveChangesAsync();
    }
}
