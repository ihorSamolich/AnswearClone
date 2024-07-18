using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    [Table("tbl_Categories")]
    public class CategoryEntity
    {
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Name { get; set; } = null!;

        [Required]
        [StringLength(200)]
        public string Slug { get; set; } = null!;

        public int? TargetGroupId { get; set; }
        public TargetGroupEntity TargetGroup { get; set; } = null!;

        public int? ParentId { get; set; }
        public virtual CategoryEntity Parent { get; set; } = null!;

        public virtual ICollection<CategoryEntity> Childrens { get; set; } = null!;
    }
}
