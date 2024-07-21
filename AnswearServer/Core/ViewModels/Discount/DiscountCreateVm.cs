using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.ViewModels.Discount
{
    public class DiscountCreateVm
    {
        public string Name { get; set; } = null!;
        public IFormFile MediaFile { get; set; } = null!;
        public IEnumerable<int> Values { get; set; } = new List<int>();

    }
}
