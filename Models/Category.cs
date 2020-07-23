namespace Postgresearch.Models {     
    public class Category   
    {        
        public int Id { get; set; }        
        public string Name { get; set; }         
        public int Parent { get; set; }     
    }
}