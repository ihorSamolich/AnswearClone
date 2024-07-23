using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Filters
{
    [Table("tbl_filterNames")]
    public class FilterNameEntity
    {
        public int Id { get; set; }

        [StringLength(255), Required]
        public string Name { get; set; } = null!;


        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public virtual CategoryEntity Category { get; set; } = null!;

        public virtual ICollection<FilterValueEntity> FilterValues { get; set; } = null!;
    }
}
