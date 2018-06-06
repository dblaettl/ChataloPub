using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Chatalo.Repository.Data
{
    public class AppUser : IdentityUser
    {
        public virtual Person Person {get; set; }
    }
}
