using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;

namespace ApiCatalog.Core.DTOs.Request
{
    public class UserRequestDTO
    {
        public string Username { get; set; } 

        public string Email { get; set; }

        public string Password { get; set; } 

    }
}
