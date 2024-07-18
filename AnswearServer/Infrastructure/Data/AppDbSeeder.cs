using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Data;

public static class AppDbSeeder
{
    public static async void SeedAsync(this IApplicationBuilder app)
    {
        using (var scope = app.ApplicationServices
            .GetRequiredService<IServiceScopeFactory>().CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var configuration = scope.ServiceProvider.GetService<IConfiguration>();
            var slugService = scope.ServiceProvider.GetRequiredService<ISlugService>();

            await context.Database.MigrateAsync();

            using var transaction = await context.Database.BeginTransactionAsync();

            try
            {
                // Seed Target Group
                if (!context.TargetGroups.Any())
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
                    context.SaveChanges();
                }

                await transaction.CommitAsync();
            }
            catch (Exception)
            {
                await transaction.RollbackAsync();
                throw;
            }
        }
    }
}
