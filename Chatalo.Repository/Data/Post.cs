using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Chatalo.Repository.Data
{
    [Table("Post")]
    public class Post
    {
        [Key]
        [Column]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PostId { get; set; }
        [Required]
        [Column]
        public int DiscussionId { get; set; }
        [ForeignKey("DiscussionId")]
        public virtual Discussion Discussion { get; set; }
        [Column]
        public string Message { get; set; }
        [Column]
        public int CreatedByPersonId { get; set; }
        [ForeignKey("CreatedByPersonId")]
        public virtual Person CreatedBy { get; set; }
        [Column]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }
}
