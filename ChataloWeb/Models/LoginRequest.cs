using ChataloWeb.Models.Validators;
using FluentValidation.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChataloWeb.Models
{
    [Validator(typeof(LoginRequestValidator))]
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
