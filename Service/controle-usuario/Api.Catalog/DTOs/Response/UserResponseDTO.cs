using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiCatalog.Core.DTOs.Response
{
    public class UserResponseDTO
    {
        public string Username { get; set; } // Login
        public string Email { get; set; } // Email
        public string Password { get; set; } // Senha
    }
}
