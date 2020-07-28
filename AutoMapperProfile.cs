using AutoMapper;
using Postgresearch.Dtos;
using Postgresearch.Models;
  
namespace Postgresearch 
{  
    public class AutoMapperProfile : Profile  
    {  
        public AutoMapperProfile()  
        {  
            CreateMap<ProductDto, Product>();  
        }  
    }  
} 