using Postgresearch.Models;

namespace Postgresearch.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }        
        public string Symbol { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}