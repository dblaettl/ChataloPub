using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Chatalo.Repository.Data
{
    [Table("Discussion")]
    public class Discussion
    {
        [Key]
        [Column]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DiscussionId { get; set; }
        [Required]
        [Column]
        public int BoardCategoryId { get; set; }
        [ForeignKey("BoardCategoryId")]
        public virtual BoardCategory BoardCategory { get; set; }
        [Column]
        public string Title { get; set; }
        [Column]
        public string Message { get; set; }
        [Column]
        public int NumViews { get; set; }
        [Column]
        public int NumPosts { get; set; }
        [Column]
        public int CreatedByPersonId { get; set; }
        [ForeignKey("CreatedByPersonId")]
        public virtual Person CreatedBy { get; set; }
        [Column]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }
}
