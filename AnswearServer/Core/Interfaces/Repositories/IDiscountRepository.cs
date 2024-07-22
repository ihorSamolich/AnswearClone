using Core.Entities.Discount;
using Core.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces.Repositories
{
    public interface IDiscountRepository
    {
        Task<DiscountEntity> GetByIdAsync(int id);
        Task<IEnumerable<DiscountEntity>> GetAllAsync();
        Task AddAsync(DiscountEntity discount);
        Task UpdateAsync(DiscountEntity discount);
        Task DeleteAsync(int id);
    }
}
