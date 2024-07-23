using Core.ViewModels.Filter;
using Core.ViewModels.Product;
namespace Core.Interfaces.Services;

public interface IProductService
{
    Task<ProductVm> GetProductByIdAsync(int id);
    Task<IEnumerable<ProductVm>> GetAllProductsAsync();
    Task AddProductAsync(ProductCreateVm product);
    Task UpdateProductAsync(ProductUpdateVm updatedProduct);
    Task DeleteProductAsync(int id);
}
