using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Chatalo.Repository.Data
{
    [Table("Person")]
    public class Person
    {
        [Key]
        [Column]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PersonId { get; set; }
        [Column]
        [MaxLength(50)]
        public string FirstName { get; set; }
        [Column]
        [MaxLength(50)]
        public string LastName { get; set; }
        [Required]
        [Column]
        [MaxLength(450)]
        public string AppUserId { get; set; }
        [ForeignKey("AppUserId")]
        public virtual AppUser AppUser { get; set; }
        [Column]
        [MaxLength(50)]
        public string City { get; set; }
        [Column]
        [MaxLength(50)]
        public string State { get; set; }
        [Column]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
    }
}
