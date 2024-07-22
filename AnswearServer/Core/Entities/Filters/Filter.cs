using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Filters
{
    [Table("tbl_filters")]
    public class Filter
    {

        [ForeignKey("FilterValue")]
        public int FilterValueId { get; set; }
        public virtual FilterValue FilterValue { get; set; } = null!;

        [ForeignKey("Product")]
        public int ProductId { get; set; }
        public virtual ProductEntity Product { get; set; } = null!;
    }
}
