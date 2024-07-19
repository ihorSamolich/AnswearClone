using Core.Constants;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace Infrastructure.Data;

public class AppDbSeeder(
    AppDbContext context,
    IConfiguration configuration,
    ISlugService slugService,
    UserManager<UserEntity> userManager,
    RoleManager<RoleEntity> roleManager
    ) : IAppDbSeeder
{
    public async Task SeedAsync()
    {
        await context.Database.MigrateAsync();

        using var transaction = await context.Database.BeginTransactionAsync();

        try
        {
            if (!await context.UserRoles.AnyAsync())
                await CreateUserRolesAsync();

            if (!await context.Users.AnyAsync())
                await CreateUserAsync();

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
    private async Task CreateUserRolesAsync()
    {
        foreach (var roleName in Roles.All)
        {
            await roleManager.CreateAsync(new RoleEntity
            {
                Name = roleName
            });
        }
    }
    private async Task CreateUserAsync()
    {
        var user = new UserEntity
        {
            FirstName = "Super",
            LastName = "Admin",
            Email = configuration["Admin:Email"]
                ?? throw new NullReferenceException("Admin:Email"),
            UserName = "superadmin",
        };

        IdentityResult result = await userManager.CreateAsync(
            user,
            configuration["Admin:Password"]
                ?? throw new NullReferenceException("Admin:Password")
        );

        if (!result.Succeeded)
            throw new Exception("Error creating admin account");

        result = await userManager.AddToRoleAsync(user, Roles.Admin);

        if (!result.Succeeded)
            throw new Exception("Role assignment error");
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

        var manClothesCategories = configuration?
                   .GetSection("DefaultSeedData:ManClothesCategories")
                   .Get<string[]>();

        var womanClothesCategories = configuration?
                   .GetSection("DefaultSeedData:WomanClothesCategories")
                   .Get<string[]>();

        var manAccessoriesCategories = configuration?
                   .GetSection("DefaultSeedData:ManAccessoriesCategories")
                   .Get<string[]>();

        var womanAccessoriesCategories = configuration?
                   .GetSection("DefaultSeedData:WomanAccessoriesCategories")
                   .Get<string[]>();

        var womanHomeAndLifestyleCategories = configuration?
                   .GetSection("DefaultSeedData:WomanHomeAndLifestyleCategories")
                   .Get<string[]>();

        var manHomeAndLifestyleCategories = configuration?
                   .GetSection("DefaultSeedData:ManHomeAndLifestyleCategories")
                   .Get<string[]>();

        if (manFootwearCategories is null || womanFootwearCategories is null)
            throw new Exception("DefaultSeedData:WomanFootwearCategories or ManFootwearCategories is invalid");

        if (manClothesCategories is null || womanClothesCategories is null)
            throw new Exception("DefaultSeedData:WomanClothesCategories or ManClothesCategories is invalid");

        if (manAccessoriesCategories is null || womanAccessoriesCategories is null)
            throw new Exception("DefaultSeedData:ManAccessoriesCategories or WomanAccessoriesCategories is invalid");

        if (manHomeAndLifestyleCategories is null || womanHomeAndLifestyleCategories is null)
            throw new Exception("DefaultSeedData:ManHomeAndLifestyleCategories or WomanHomeAndLifestyleCategories is invalid");

        var parentCategories = context.Categories
            .Include(x => x.TargetGroup)
            .Where(c => c.ParentId == null).ToList();

        var listCategories = new List<CategoryEntity>();

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

                    listCategories.Add(manCategory);
                }

            }
            if (category.Name == "Взуття" && category.TargetGroup.Name == "Вона")
            {

                foreach (var womanCategoryName in womanFootwearCategories)
                {
                    var womanCategory = new CategoryEntity
                    {
                        Name = womanCategoryName,
                        Slug = slugService.GenerateSlug(womanCategoryName),
                        ParentId = category.Id,
                    };

                    listCategories.Add(womanCategory);
                }

            }
            if (category.Name == "Одяг" && category.TargetGroup.Name == "Вона")
            {

                foreach (var womanCategoryName in womanClothesCategories)
                {
                    var womanCategory = new CategoryEntity
                    {
                        Name = womanCategoryName,
                        Slug = slugService.GenerateSlug(womanCategoryName),
                        ParentId = category.Id,
                    };

                    listCategories.Add(womanCategory);
                }

            }
            if (category.Name == "Одяг" && category.TargetGroup.Name == "Він")
            {

                foreach (var manCategoryName in manClothesCategories)
                {
                    var manCategory = new CategoryEntity
                    {
                        Name = manCategoryName,
                        Slug = slugService.GenerateSlug(manCategoryName),
                        ParentId = category.Id,
                    };

                    listCategories.Add(manCategory);
                }

            }
            if (category.Name == "Аксесуари" && category.TargetGroup.Name == "Він")
            {

                foreach (var manCategoryName in manAccessoriesCategories)
                {
                    var manCategory = new CategoryEntity
                    {
                        Name = manCategoryName,
                        Slug = slugService.GenerateSlug(manCategoryName),
                        ParentId = category.Id,
                    };

                    listCategories.Add(manCategory);
                }

            }
            if (category.Name == "Аксесуари" && category.TargetGroup.Name == "Вона")
            {

                foreach (var womanCategoryName in womanAccessoriesCategories)
                {
                    var womanCategory = new CategoryEntity
                    {
                        Name = womanCategoryName,
                        Slug = slugService.GenerateSlug(womanCategoryName),
                        ParentId = category.Id,
                    };

                    listCategories.Add(womanCategory);
                }

            }
            if (category.Name == "Дім & Лайфстайл" && category.TargetGroup.Name == "Вона")
            {

                foreach (var womanCategoryName in womanHomeAndLifestyleCategories)
                {
                    var womanCategory = new CategoryEntity
                    {
                        Name = womanCategoryName,
                        Slug = slugService.GenerateSlug(womanCategoryName),
                        ParentId = category.Id,
                    };

                    listCategories.Add(womanCategory);
                }

            }
            if (category.Name == "Дім & Лайфстайл" && category.TargetGroup.Name == "Він")
            {

                foreach (var manCategoryName in manHomeAndLifestyleCategories)
                {
                    var manCategory = new CategoryEntity
                    {
                        Name = manCategoryName,
                        Slug = slugService.GenerateSlug(manCategoryName),
                        ParentId = category.Id,
                    };

                    listCategories.Add(manCategory);
                }

            }
        }

        context.Categories.AddRange(listCategories);

        await context.SaveChangesAsync();
    }
}