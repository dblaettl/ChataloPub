using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChataloWeb.Helpers
{
    public static class Constants
    {
        public static class Strings
        {
            public static class JwtClaimIdentifiers
            {
                public const string Rol = "rol", Id = "id", Refresh = "refresh";
            }

            public static class JwtClaims
            {
                public const string User = "user";
                public const string Admin = "admin";
            }
        }
    }
}
