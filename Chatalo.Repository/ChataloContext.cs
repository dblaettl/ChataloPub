using Chatalo.Repository.Data;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Chatalo.Repository
{
 

    public class ChataloContext : IdentityDbContext<AppUser>
    {
        public ChataloContext(DbContextOptions<ChataloContext> options) : base(options) { }
        public DbSet<Person> Persons { get; set; }
        public DbSet<Board> Boards { get; set; }
        public DbSet<BoardCategory> BoardCategories { get; set; }
        public DbSet<Discussion> Discussions { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<AppUser>()
                 .HasOne(au => au.Person).WithOne(p => p.AppUser);
            
            // SQL Server doesn't store DateTimeKind so we'll need to set this when we retrieve the data back
            modelBuilder
                .Entity<Post>()
                .Property(e => e.DateCreated)
                .HasConversion(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
            modelBuilder
                .Entity<Discussion>()
                .Property(e => e.DateCreated)
                .HasConversion(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
            modelBuilder
                .Entity<Person>()
                .Property(e => e.DateCreated)
                .HasConversion(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
            modelBuilder
                .Entity<Message>()
                .Property(e => e.DateCreated)
                .HasConversion(v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
        }
    }
}
