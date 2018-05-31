using Chatalo.Repository.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Chatalo.Repository
{
 

    public class ChataloContext : DbContext
    {
        public ChataloContext(DbContextOptions<ChataloContext> options) : base(options) { }
        public DbSet<Person> Persons { get; set; }
        public DbSet<Board> Boards { get; set; }
        public DbSet<BoardCategory> BoardCategories { get; set; }
        public DbSet<Discussion> Discussions { get; set; }
        public DbSet<Post> Posts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Post>()
                .Property(e => e.DateCreated)
                .HasConversion(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
            modelBuilder
                .Entity<Discussion>()
                .Property(e => e.DateCreated)
                .HasConversion(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
        }
    }
}
