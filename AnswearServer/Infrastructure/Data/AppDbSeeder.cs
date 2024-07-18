using Core.Entities;
using Core.Interfaces;
using Core.ViewModels;
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

            if (!await context.Categories.AnyAsync())
            {
                await CreateParentCategoryAsync();
                await CreateChildrenCategoryAsync();
            }

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

    private async Task CreateParentCategoryAsync()
    {
        var defaultParentCategories = configuration?
                    .GetSection("DefaultSeedData:ParentCategories")
                    .Get<string[]>();

        if (defaultParentCategories is null)
            throw new Exception("DefaultSeedData:ParentCategories is invalid");

        var parentCategoriesGroups = new List<CategoryEntity>();

        var adultsTargetGroups = context.TargetGroups.Where(g => !g.Name.Equals("Діти")).ToList();

        foreach (var adultsGroup in adultsTargetGroups)
        {
            foreach (var category in defaultParentCategories)
            {
                var newCategory = new CategoryEntity
                {
                    Name = category,
                    Slug = slugService.GenerateSlug(category),
                    TargetGroup = adultsGroup,
                };

                parentCategoriesGroups.Add(newCategory);
            }
        }
        context.Categories.AddRange(parentCategoriesGroups);

        await context.SaveChangesAsync();
    }

    private async Task CreateChildrenCategoryAsync()
    {
        var manFootwearCategories = configuration?
                    .GetSection("DefaultSeedData:ManFootwearCategories")
                    .Get<string[]>();

        var womanFootwearCategories = configuration?
                   .GetSection("DefaultSeedData:WomenFootwearCategories")
                   .Get<string[]>();


        if (manFootwearCategories is null || womanFootwearCategories is null)
            throw new Exception("DefaultSeedData:WomanFootwearCategories or ManFootwearCategories is invalid");

        var parentCategories = context.Categories
            .Include(x => x.TargetGroup)
            .Where(c => c.ParentId == null).ToList();

        var footwearCategories = new List<CategoryEntity>();

        foreach (var category in parentCategories)
        {
            if (category.Name == "Взуття" && category.TargetGroup.Name == "Він")
            {

                foreach (var manCategoryName in manFootwearCategories)
                {
                    var manCategory = new CategoryEntity
                    {
                        Name = manCategoryName,
                        Slug = slugService.GenerateSlug(manCategoryName),
                        ParentId = category.Id,
                    };

                    footwearCategories.Add(manCategory);
                }

            }
            if (category.Name == "Взуття" && category.TargetGroup.Name == "Вона")
            {

                foreach (var womanCategoryName in womanFootwearCategories)
                {
                    var manCategory = new CategoryEntity
                    {
                        Name = womanCategoryName,
                        Slug = slugService.GenerateSlug(womanCategoryName),
                        ParentId = category.Id,
                    };

                    footwearCategories.Add(manCategory);
                }

            }
        }

        context.Categories.AddRange(footwearCategories);

        await context.SaveChangesAsync();
    }
}