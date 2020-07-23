using Microsoft.EntityFrameworkCore;

namespace Postgresearch.Models
{     
    public class PostgresearchContext : DbContext     
    {         
        public PostgresearchContext(DbContextOptions<PostgresearchContext> options)                            : base(options)         
        {         
        }

        public DbSet<Category> Categories { get; set; } 
        public DbSet<Product> Products { get; set; }   

    } 
}