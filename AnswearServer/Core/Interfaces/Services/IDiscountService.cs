using Core.Entities.Discount;
using Core.ViewModels.Discount;
using Core.ViewModels.TargetGroup;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces.Services
{
    public interface IDiscountService
    {
        Task<DiscountVm> GetDiscountByIdAsync(int id);
        Task<IEnumerable<DiscountVm>> GetAllDiscountAsync();
        Task AddDiscountAsync(DiscountCreateVm discount);
        Task UpdateDiscountAsync(DiscountUpdateVm discount);
        Task DeleteDiscountAsync(int id);
    }
}
