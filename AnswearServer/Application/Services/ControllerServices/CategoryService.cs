using AutoMapper;
using Core.Interfaces.Repositories;
using Core.Interfaces;
using Core.Interfaces.Services;
using Core.ViewModels.Category;
using Core.Entities;

namespace Application.Services.ControllerServices;

public class CategoryService(
    ICategoryRepository repository,
    IMapper mapper,
    ISlugService slugService
) : ICategoryService
{
    public async Task<CategoryVm> GetCategoryByIdAsync(int id)
    {
        var entity = await repository.GetByIdAsync(id);

        return mapper.Map<CategoryVm>(entity);
    }
    public async Task<IEnumerable<CategoryVm>> GetAllCategoriesAsync()
    {
        var entities = await repository.GetAllAsync();

        return mapper.Map<List<CategoryVm>>(entities);
    }
    public async Task DeleteCategoryAsync(int id)
    {
        await repository.DeleteAsync(id);
    }
    public async Task AddCategoryAsync(CategoryCreateVm category)
    {
        var newCategory = mapper.Map<CategoryEntity>(category);
        newCategory.Slug = slugService.GenerateSlug(category.Name);
        await repository.AddAsync(newCategory);
    }

    public async Task UpdateCategoryAsync(CategoryUpdateVm category)
    {
        var editedCategory = await repository.GetByIdAsync(category.Id);

        if (editedCategory != null)
        {
            editedCategory.Name = category.Name;
            editedCategory.Slug = slugService.GenerateSlug(category.Name);

            if (category.ParentId > 0)
                editedCategory.ParentId = category.ParentId;

            editedCategory.TargetGroupId = category.TargetGroupId;

            await repository.UpdateAsync(editedCategory);
        }
    }
}
