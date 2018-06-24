using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Chatalo.Repository.Data
{
    [Table("Board")]
    public class Board
    {
        [Key]
        [Column]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BoardId { get; set; }
        [Column]
        [MaxLength(500)]
        public string Name { get; set; }
        [Column]
        public string Description { get; set; }       
        public virtual ICollection<BoardCategory> BoardCategories { get; set; }
        [Column]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }
}
