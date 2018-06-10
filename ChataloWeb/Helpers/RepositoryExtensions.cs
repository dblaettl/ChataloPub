using Chatalo.Repository;
using Chatalo.Repository.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ChataloWeb.Helpers
{
    public static class RepositoryExtensions
    {
        public static async Task<Person> GetPersonForClaimsPrincipalAsync(this IChataloRepository repository, ClaimsPrincipal claimsPrincipal)
        {
            var appUserId = claimsPrincipal.Claims.First(cl => cl.Type == Helpers.Constants.Strings.JwtClaimIdentifiers.Id).Value;
            return await repository.GetPersonByAppUseridAsync(appUserId);
        }
    }
}
