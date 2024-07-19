using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities.Discount
{
    [Table("tbl_DiscountValues")]
    public class DiscountValue
    {
        public int Id { get; set; }

        [Column(TypeName = "decimal(5,2)")]
        public decimal Percentage { get; set; }

        public int DiscountId { get; set; }
        public Discount Discount { get; set; } = null!;
    }
}
