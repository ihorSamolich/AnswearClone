using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.ViewModels.Discount
{
    public class DiscountUpdateVm
    {
        [Required]
        public int Id { get; set; }

        [StringLength(255), Required]
        public string Name { get; set; } = null!;
        public IFormFile? MediaFile { get; set; }
        public IEnumerable<int> Values { get; set; } = new List<int>();
    }
}
