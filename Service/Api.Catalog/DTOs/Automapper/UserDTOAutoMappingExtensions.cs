using ApiCatalog.Core.DTOs.Request;
using ApiCatalog.Core.DTOs.Response;
using ApiCatalog.Core.Entities;
using AutoMapper;

namespace ApiCatalog.Core.DTOs.Automapper
{
    public class UserDTOAutoMappingExtensions : Profile
    {
        public UserDTOAutoMappingExtensions()
        {
            CreateMap<User, UserRequestDTO>().ReverseMap();
            CreateMap<User, UserResponseDTO>().ReverseMap();
        }
    }
}
