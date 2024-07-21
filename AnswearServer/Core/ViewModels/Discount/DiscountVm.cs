using Core.Entities.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.ViewModels.Discount;

public class DiscountVm
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string MediaFile { get; set; } = null!;
    public ICollection<DiscountValueVm> DiscountValues { get; set; } = new List<DiscountValueVm>();
}

