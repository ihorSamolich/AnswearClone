using Core.ViewModels.Filter;
using Core.ViewModels.Product;
namespace Core.Interfaces.Services;

public interface IProductService
{
    Task<ProductVm> GetProductByIdAsync(int id);
    Task<IEnumerable<ProductVm>> GetAllProductsAsync();
    //Task AddFilterAsync(ProductCreateVm product);
    //Task UpdateFilterAsync(ProductUpdateVm product);
    Task DeleteProductAsync(int id);
}
