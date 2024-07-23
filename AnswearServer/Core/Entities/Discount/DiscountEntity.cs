using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Discount
{
    [Table("tbl_Discounts")]
    public class DiscountEntity
    {
        public int Id { get; set; }

        [StringLength(255), Required]
        public string Name { get; set; } = null!;
        public string MediaFile { get; set; } = null!;

        public ICollection<DiscountValueEntity> DiscountValues { get; set; } = new List<DiscountValueEntity>();
    }
}
