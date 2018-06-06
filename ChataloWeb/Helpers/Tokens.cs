using ChataloWeb.Auth;
using ChataloWeb.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ChataloWeb.Helpers
{
    public static class Tokens
    {
        public static async Task<object> GenerateJwt(ClaimsIdentity identity, IJwtFactory jwtFactory, string userName, JwtIssuerOptions jwtOptions)
        {
            return new
            {
                id = identity.Claims.Single(c => c.Type == "id").Value,
                auth_token = await jwtFactory.GenerateEncodedToken(userName, identity),
                refresh_token = identity.Claims.Single(c => c.Type == "refresh").Value,
                expires_in = (int)jwtOptions.ValidFor.TotalSeconds
            };
        }
    }
}
