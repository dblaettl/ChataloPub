using Chatalo.Repository.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Chatalo.Repository
{
    public class ChataloContext : DbContext
    {
        public ChataloContext(DbContextOptions<ChataloContext> options) : base(options) { }
        public DbSet<Person> Persons { get; set; }

 
    }
}
