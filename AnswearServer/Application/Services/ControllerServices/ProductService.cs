using AutoMapper;
using Core.Interfaces.Repositories;
using Core.Interfaces;
using Core.Interfaces.Services;
using Core.ViewModels.Product;
using Core.Entities;
using Infrastructure.Data.Repositories;
using Core.Entities.Filters;

namespace Application.Services.ControllerServices;

public class ProductService(
    IProductRepository repository,
    IMapper mapper,
    ISlugService slugService,
    IImageService imageService
    ) : IProductService
{
    public async Task<IEnumerable<ProductVm>> GetAllProductsAsync()
    {
        var entities = await repository.GetAllAsync();

        return mapper.Map<List<ProductVm>>(entities);
    }

    public async Task<ProductVm> GetProductByIdAsync(int id)
    {
        var entity = await repository.GetByIdAsync(id);

        return mapper.Map<ProductVm>(entity);
    }

    public async Task DeleteProductAsync(int id)
    {
        await repository.DeleteAsync(id);
    }

    public async Task AddProductAsync(ProductCreateVm product)
    {
        var productEntity = mapper.Map<ProductEntity>(product);


        foreach (var variation in product.Variations)
        {
            var productVariation = mapper.Map<ProductVariationEntity>(variation);
            productVariation.Slug = slugService.GenerateSlugWithTime($"{productEntity.Name} {variation.ShortDescription}");
            productEntity.Variations.Add(productVariation);

            foreach (var filter in product.Filters)
            {
                productVariation.Filters.Add(new FilterEntity
                {
                    FilterValueId = filter
                });
            }

            foreach (var photo in variation.Photos)
            {
                productVariation.Photos.Add(new ProductPhotoEntity
                {
                    Name = await imageService.SaveImageAsync(photo),
                    Priority = 0
                });
            }
        }

        await repository.AddAsync(productEntity);
    }

    public async Task UpdateProductAsync(ProductUpdateVm updatedProduct)
    {
        var productEntity = await repository.GetByIdAsync(updatedProduct.Id);

        if (productEntity == null)
        {
            throw new KeyNotFoundException("Product not found");
        }

        productEntity.Name = updatedProduct.Name;
        productEntity.Description = updatedProduct.Description;
        productEntity.CategoryId = updatedProduct.CategoryId;

        foreach (var variationVm in updatedProduct.Variations)
        {
            var existingVariation = productEntity.Variations.FirstOrDefault(v => v.Id == variationVm.Id);

            if (existingVariation != null)
            {
                existingVariation.ShortDescription = variationVm.ShortDescription;
                existingVariation.Price = variationVm.Price;
                existingVariation.DiscountValueId = variationVm.DiscountValueId;

                existingVariation.Photos.Clear();
                foreach (var photo in variationVm.Photos)
                {
                    existingVariation.Photos.Add(new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageAsync(photo),
                        Priority = 0
                    });
                }
            }
            else
            {
                var newVariation = mapper.Map<ProductVariationEntity>(variationVm);
                newVariation.Slug = slugService.GenerateSlugWithTime($"{productEntity.Name} {variationVm.ShortDescription}");
                productEntity.Variations.Add(newVariation);

                foreach (var photo in variationVm.Photos)
                {
                    newVariation.Photos.Add(new ProductPhotoEntity
                    {
                        Name = await imageService.SaveImageAsync(photo),
                        Priority = 0
                    });
                }
            }
        }

        await repository.UpdateAsync(productEntity);
    }
}
