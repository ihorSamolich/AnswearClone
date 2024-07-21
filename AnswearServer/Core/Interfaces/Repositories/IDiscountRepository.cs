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
        Task<Discount> GetByIdAsync(int id);
        Task<IEnumerable<Discount>> GetAllAsync();
        Task AddAsync(Discount discount);
        Task UpdateAsync(Discount discount);
        Task DeleteAsync(int id);
    }
}
