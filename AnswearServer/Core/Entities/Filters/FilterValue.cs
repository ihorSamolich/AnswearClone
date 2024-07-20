using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Filters
{
    [Table("tbl_filterValues")]
    public class FilterValue 
    {
        public int Id { get; set; }

        [StringLength(255), Required]
        public string Name { get; set; } = null!;

        [ForeignKey("FilterName")]
        public int FilterNameId { get; set; }
        public virtual FilterName FilterName { get; set; } = null!;

        public virtual ICollection<FilterValue> FilterValues { get; set; } = null!;

        public ICollection<Filter> Filters { get; set; } = new List<Filter>();
    }
}
