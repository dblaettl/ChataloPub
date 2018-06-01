using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Chatalo.Repository.Data
{
    [Table("Person")]
    public class Person
    {
        [Column]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PersonId { get; set; }
        [Column]
        public string FirstName { get; set; }
        [Column]
        public string LastName { get; set; }
        [Column]
        public string Email { get; set; }
        [Column]
        public string Password { get; set; }
        [Column]
        public string City { get; set; }
        [Column]
        public string State { get; set; }
        [Column]
        public DateTime DateCreated { get; set; }
    }
}
