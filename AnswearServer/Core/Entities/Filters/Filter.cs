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

        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        public virtual CategoryEntity Category { get; set; } = null!;
    }
}
