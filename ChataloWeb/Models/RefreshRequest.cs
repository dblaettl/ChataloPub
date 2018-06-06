using ChataloWeb.Models.Validators;
using FluentValidation.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChataloWeb.Models
{
    public class RefreshRequest
    {
        public string Id { get; set; }
        public string RefreshToken { get; set; }
    }
}
