using Microsoft.EntityFrameworkCore;

namespace Postgresearch.Models
{     
    public class PostgresearchContext : DbContext     
    {         
        public PostgresearchContext(DbContextOptions<PostgresearchContext> options)                            : base(options)         
        {         
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasIndex(p => p.SearchVector)
                .HasMethod("GIN"); // Index method on the search vector (GIN or GIST)
        }

        public DbSet<Category> Categories { get; set; } 
        public DbSet<Product> Products { get; set; }   

    } 
}