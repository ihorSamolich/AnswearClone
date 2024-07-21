using Core.Constants;
using Core.Entities;
using Core.Entities.Discount;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Data;
using System.Net.Http;
using System.Xml.Linq;

namespace Infrastructure.Data;

public class AppDbSeeder(
    AppDbContext context,
    IConfiguration configuration,
    ISlugService slugService,
    IImageService imageService,
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

            if (!await context.Products.AnyAsync())
                await CreateProductsAsync();

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
                        TargetGroupId = category.TargetGroupId,
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
                        TargetGroupId = category.TargetGroupId,
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
                        TargetGroupId = category.TargetGroupId,
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
                        TargetGroupId = category.TargetGroupId,
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
                        TargetGroupId = category.TargetGroupId,
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
                        TargetGroupId = category.TargetGroupId,
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
                        TargetGroupId = category.TargetGroupId,
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
                        TargetGroupId = category.TargetGroupId,
                        ParentId = category.Id,
                    };

                    listCategories.Add(manCategory);
                }

            }
        }

        context.Categories.AddRange(listCategories);

        await context.SaveChangesAsync();
    }
    private async Task CreateProductsAsync()
    {
        // Ensure discount exists
        var discount = context.Discounts.Include(d => d.DiscountValues).FirstOrDefault(d => d.Name == "Summer Sale");
        if (discount == null)
        {
            discount = new Discount
            {
                Name = "Summer Sale",
                MediaFile = await imageService.SaveImageFromUrlAsync("https://answear.ua/blog/wp-content/uploads/2024/05/main_photo.jpg"),
                DiscountValues = new List<DiscountValue>
            {
                new DiscountValue { Percentage = 37 },
                new DiscountValue { Percentage = 35 },
                new DiscountValue { Percentage = 47 },
                new DiscountValue { Percentage = 55 },
                new DiscountValue { Percentage = 49 }
            }
            };

            context.Discounts.Add(discount);
            await context.SaveChangesAsync();
        }

        var discounts = context.Discounts.Include(d => d.DiscountValues).ToList();
        if (discounts.Count == 0)
        {
            throw new Exception("No discounts available");
        }

        Random random = new Random();

        var categoryJeansMan = context.Categories
            .Where(p => p.Name.Equals("Джинси") && p.TargetGroup.Name.Equals("Він"))
            .FirstOrDefault();

        var categoryJeansWoman = context.Categories
            .Where(p => p.Name.Equals("Джинси") && p.TargetGroup.Name.Equals("Вона"))
            .FirstOrDefault();

        if (categoryJeansMan == null)
            throw new Exception("Category 'Джинси' for 'Він' not found");

        if (categoryJeansWoman == null)
            throw new Exception("Category 'Джинси' for 'Вона' not found");

        var manJeans = new List<Product>
        {
            new Product
            {
                Name = "Джинси BOSS",
                ShortDescription ="чоловічі колір синій 50524007",
                Description = "Джинси із колекції BOSS фасону slim із завищеною талією. Модель виготовлена із гладкого деніму.\r\n- Модель із завищеною талією та застібкою на ґудзики і блискавку.\r\n- Спереду три прорізні кишені.\r\n- Дві накладні кишені на сідницях.\r\n- Ширина талії: 39 cm.\r\n- Напівобхват стегон: 47 cm.\r\n- Висота талії: 27 cm.\r\n- Ширина штанини знизу: 16 cm.\r\n- Ширина штанини зверху: 27 cm.\r\n- Зовнішня довжина штанини: 104 cm.\r\n- Параметри вказані для розміру: 31/32.\r\nСклад: 98% Бавовна, 2% Еластан\r\nID Товару: 99KK-SJM0FG_59J\r\nКод виробника: 50524007",
                CategoryId = categoryJeansMan.Id,
                Price = 6399,
                Slug = slugService.GenerateSlug("Джинси BOSS чоловічі колір синій 50524007"),
                DiscountValueId = ShouldApplyDiscount(random) ? GetRandomDiscountValue(discounts, random).Id : (int?)null,
                Photos = new List<ProductPhotoEntity>
                {
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/AA00-SJM0FG-59J_F1.jpg@webp?v=1716355215"),
                        Priority = 1
                    },
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/AA00-SJM0FG-59J_F2.jpg@webp?v=1716354371"),
                        Priority = 2
                    },
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/AA00-SJM0FG-59J_F3.jpg@webp?v=1716355330"),
                        Priority = 3
                    },
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/AA00-SJM0FG-59J_F4.jpg@webp?v=1716354849"),
                        Priority = 4
                    },
                }
            },
            new Product
            {
                Name = "Джинси Tommy Jeans",
                ShortDescription ="чоловічі колір білий DM0DM18746",
                Description = "Джинси із колекції Tommy Jeans фасону slim із звичайною талією. Модель виготовлена із гладкого деніму. Еластичний, прилягаючий до фігури, матеріал.\r\n- Модель частково виготовлена ​​з переробленої бавовни.\r\n- Фасон slim - джинси із завуженою посадкою та вузькою штаниною в зоні стегна та щиколотки. Підкреслюють природні контури фігури, але не обтягують її - зручні для повсякденного носіння.\r\n- Модель із регулярною талією та застібкою на ґудзики і блискавку.\r\n- Спереду три прорізні кишені.\r\n- Дві накладні кишені на сідницях.\r\n- Ширина талії: 43,5 cm.\r\n- Напівобхват стегон: 55 cm.\r\n- Висота талії: 25 cm.\r\n- Ширина штанини знизу: 18,5 cm.\r\n- Ширина штанини зверху: 29,5 cm.\r\n- Зовнішня довжина штанини: 105 cm.\r\n- Параметри вказані для розміру: 31/32.\r\nСклад: 99% Бавовна, 1% Еластан\r\nID Товару: PPYH-SJM0D7_00J\r\nКод виробника: DM0DM18746",
                CategoryId = categoryJeansMan.Id,
                Price = 3999,
                Slug = slugService.GenerateSlug("Джинси Tommy Jeans чоловічі колір білий DM0DM18746"),
                DiscountValueId = ShouldApplyDiscount(random) ? GetRandomDiscountValue(discounts, random).Id : (int?)null,
                Photos = new List<ProductPhotoEntity>
                {
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJM0D7-00J_F1.jpg@webp?v=1714025066"),
                        Priority = 1
                    },
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJM0D7-00J_F2.jpg@webp?v=1714026069"),
                        Priority = 2
                    },
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJM0D7-00J_F3.jpg@webp?v=1714027713"),
                        Priority = 3
                    },
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJM0D7-00J_F4.jpg@webp?v=1714026394"),
                        Priority = 4
                    },
                }
            },
            new Product
            {
                Name = "Джинси Tommy Hilfiger",
                ShortDescription ="чоловічі MW0MW35171",
                Description = "Джинси із колекції Tommy Hilfiger фасону regular із звичайною талією. Модель виготовлена із декоративно випраного деніму.\r\n- Модель частково виготовлена ​​з волокон, вироблених з використанням екологічних виробничих процесів, що зменшує їх вплив на навколишнє середовище.\r\n- Технологія Tech Stretch забезпечує винятковий комфорт використання та стійкість до зминання.\r\n- Модель із регулярною талією та застібкою на ґудзики і блискавку.\r\n- Спереду три прорізні кишені.\r\n- Дві накладні кишені на сідницях.\r\n- Денім з декоративними потертостями.\r\n- Ширина талії: 40 cm.\r\n- Напівобхват стегон: 49 cm.\r\n- Висота талії: 25 cm.\r\n- Ширина штанини знизу: 17 cm.\r\n- Ширина штанини зверху: 29 cm.\r\n- Зовнішня довжина штанини: 103 cm.\r\n- Параметри вказані для розміру: 31/32.\r\nСклад: Матеріал 1: 99% Бавовна, 1% Еластан\r\nМатеріал 2: 69% Бавовна, 30% Перероблена бавовна, 1% Еластан\r\nID Товару: PPYH-SJM0A6_90X\r\nКод виробника: MW0MW35171",
                CategoryId = categoryJeansMan.Id,
                Price = 5599,
                Slug = slugService.GenerateSlug("Джинси Tommy Hilfiger чоловічі MW0MW35171"),
                DiscountValueId = ShouldApplyDiscount(random) ? GetRandomDiscountValue(discounts, random).Id : (int?)null,
                Photos = new List<ProductPhotoEntity>
                {
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJM0A6-90X_F1.jpg@webp?v=1713936042"),
                        Priority = 1
                    },
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJM0A6-90X_F2.jpg@webp?v=1713935082"),
                        Priority = 2
                    },
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJM0A6-90X_F3.jpg@webp?v=1713935198"),
                        Priority = 3
                    },
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJM0A6-90X_F4.jpg@webp?v=1713936511"),
                        Priority = 4
                    },
                }
            },
        };

        var womanJeans = new List<Product>
        {
            new Product
            {
                Name = "Джинси adidas Originals",
                ShortDescription ="жіночі висока посадка IS3584",
                Description = "Джинси із колекції adidas Originals фасону relaxed із завищеною талією. Модель виготовлена з негнучкого деніму. Бавовняний, комфортний матеріал.\r\n- Джинси вільні в зоні стегон.\r\n- Прямі штанини по всій довжині.\r\n- Модель із завищеною талією, застібка на блискавку та гачок.\r\n- Ззаду кишені.\r\n- Ширина талії: 37 cm.\r\n- Напівобхват стегон: 58 cm.\r\n- Висота талії: 35 cm.\r\n- Ширина штанини знизу: 37 cm.\r\n- Ширина штанини зверху: 37 cm.\r\n- Зовнішня довжина штанини: 111 cm.\r\n- Параметри вказані для розміру: 30.\r\nСклад: 100% Бавовна\r\nID Товару: PPYH-SPD199_01X\r\nКод виробника: IS3584",
                CategoryId = categoryJeansWoman.Id,
                Price = 3899,
                Slug = slugService.GenerateSlug("Джинси adidas Originals жіночі висока посадка IS3584"),
                DiscountValueId = ShouldApplyDiscount(random) ? GetRandomDiscountValue(discounts, random).Id : (int?)null,
                Photos = new List<ProductPhotoEntity>
                {
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SPD199-01X_F1.jpg@webp?v=1714368758"),
                        Priority = 1
                    },
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SPD199-01X_F2.jpg@webp?v=1714367206"),
                        Priority = 2
                    },
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SPD199-01X_F3.jpg@webp?v=1714367690"),
                        Priority = 3
                    },
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SPD199-01X_F4.jpg@webp?v=1714368513"),
                        Priority = 4
                    },
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SPD199-01X_F5.jpg@webp?v=1714367206"),
                        Priority = 4
                    },
                }
            },
            new Product
            {
                Name = "Джинси Karl Lagerfeld Jeans",
                ShortDescription ="жіночі висока посадка",
                Description = "Джинси із колекції Karl Lagerfeld Jeans фасону tapered із завищеною талією. Модель виготовлена із декоративно випраного деніму. Надзвичайно комфортний матеріал з високим вмістом бавовни.\r\n- Моделі лінійки Karl Cares виготовлені з матеріалів, виготовлених у процесі сталого, екологічно чистого виробництва.\r\n- Джинси злегка приталені в зоні стегон.\r\n- Завужена штанина.\r\n- Модель із завищеною талією та застібкою на ґудзики.\r\n- Спереду три прорізні кишені.\r\n- Дві накладні кишені на сідницях.\r\n- Ширина талії: 34 cm.\r\n- Напівобхват стегон: 45 cm.\r\n- Висота талії: 29 cm.\r\n- Ширина штанини знизу: 18 cm.\r\n- Ширина штанини зверху: 28 cm.\r\n- Зовнішня довжина штанини: 104 cm.\r\n- Параметри вказані для розміру: 26/32.\r\nСклад: Основний матеріал: 99% Бавовна, 1% Еластан\r\nПідкладка: 65% Поліестер, 35% Органічна бавовна\r\nID Товару: PPYH-SJD0P2_50J\r\nКод виробника: 241J1109",
                CategoryId = categoryJeansWoman.Id,
                Price = 5299,
                Slug = slugService.GenerateSlug("Джинси Karl Lagerfeld Jeans жіночі висока посадка"),
                DiscountValueId = ShouldApplyDiscount(random) ? GetRandomDiscountValue(discounts, random).Id : (int?)null,
                Photos = new List<ProductPhotoEntity>
                {
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJD0P2-50J_F1.jpg@webp?v=1709276928"),
                        Priority = 1
                    },
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJD0P2-50J_F2.jpg@webp?v=1709277536"),
                        Priority = 2
                    },
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJD0P2-50J_F4.jpg@webp?v=1709277762"),
                        Priority = 3
                    },
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJD0P2-50J_F5.jpg@webp?v=1709277657"),
                        Priority = 4
                    },
                }
            },
            new Product
            {
                Name = "Джинси HUGO 1993",
                ShortDescription ="жіночі висока посадка",
                Description = "Джинси із колекції HUGO фасону cargo із завищеною талією. Модель виготовлена із декоративно випраного деніму. Бавовняний, комфортний матеріал.\r\n- Цей продукт частково виготовлений з переробленої бавовни.\r\n- Джинси вільні в зоні стегон.\r\n- Прямі штанини по всій довжині.\r\n- Модель із завищеною талією та застібкою на ґудзики і блискавку.\r\n- Спереду три прорізні кишені.\r\n- Дві накладні кишені на сідницях.\r\n- Кишені типу cargo забезпечують додаткове місце для зберігання дрібних речей.\r\n- Ширина талії: 37 cm.\r\n- Напівобхват стегон: 50 cm.\r\n- Висота талії: 30 cm.\r\n- Ширина штанини знизу: 24 cm.\r\n- Ширина штанини зверху: 29 cm.\r\n- Зовнішня довжина штанини: 103 cm.\r\n- Параметри вказані для розміру: 27/32.\r\nСклад: 80% Бавовна, 20% Перероблена бавовна\r\nID Товару: PPYH-SJD00N_90J\r\nКод виробника: 50507887",
                CategoryId = categoryJeansWoman.Id,
                Price = 5999,
                Slug = slugService.GenerateSlug("Джинси HUGO 1993 жіночі висока посадка"),
                DiscountValueId = ShouldApplyDiscount(random) ? GetRandomDiscountValue(discounts, random).Id : (int?)null,
                Photos = new List<ProductPhotoEntity>
                {
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJD00N-90J_F1.jpg@webp?v=1700725484"),
                        Priority = 1
                    },
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJD00N-90J_F2.jpg@webp?v=1700726801"),
                        Priority = 2
                    },
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJD00N-90J_F3.jpg@webp?v=1700725849"),
                        Priority = 3
                    },
                    new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageFromUrlAsync("https://img2.ans-media.com/i/540x813/SS24-SJD00N-90J_F4.jpg@webp?v=1700725001"),
                        Priority = 4
                    },
                }
            },
        };

        context.Products.AddRange(manJeans);
        context.Products.AddRange(womanJeans);


        await context.SaveChangesAsync();
    }


    // Method to decide if a discount should be applied
    private bool ShouldApplyDiscount(Random random)
    {
        return random.NextDouble() < 0.4; // 40% chance
    }

    // Method to get a random DiscountValue from a list of Discounts
    private DiscountValue GetRandomDiscountValue(List<Discount> discounts, Random random)
    {
        var allDiscountValues = discounts.SelectMany(d => d.DiscountValues).ToList();
        if (allDiscountValues.Count == 0)
        {
            throw new Exception("No discount values available");
        }
        return allDiscountValues[random.Next(allDiscountValues.Count)];
    }

}