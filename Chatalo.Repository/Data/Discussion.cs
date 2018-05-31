using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Chatalo.Repository.Data
{
    [Table("Discussion")]
    public class Discussion
    {
        [Column]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DiscussionId { get; set; }
        [Column]
        public int BoardCategoryId { get; set; }
        [Column]
        public string Title { get; set; }
        [Column]
        public string Message { get; set; }
        [Column]
        public int NumViews { get; set; }
        [Column]
        public int NumPosts { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }
}
