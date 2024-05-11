using Core.DTOs.Request;
using Core.DTOs.Response;
using Core.Entities;
using AutoMapper;

namespace Core.DTOs.Automapper
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
