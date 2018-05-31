using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Chatalo.Repository.Data
{
    [Table("BoardCategory")]
    public class BoardCategory
    {
        [Column]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BoardCategoryId { get; set; }
        [Column]
        public int BoardId { get; set; }
        [Column]
        public string Name { get; set; }
        [Column]
        public string Description { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }
}
