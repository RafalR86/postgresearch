using NpgsqlTypes;

namespace Postgresearch.Models {     
    public class Product   
    {        
        public int Id { get; set; }        
        public string Symbol { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public NpgsqlTsVector SearchVector { get; set; }              
    }
}