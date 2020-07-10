using System;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions opt) : base(opt)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // builder.Entity<Value>().HasData(new Value{}, new Value{});
            base.OnModelCreating(builder);
        }
    }
}
