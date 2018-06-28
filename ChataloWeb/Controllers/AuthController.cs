using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Chatalo.Repository.Data;
using ChataloWeb.Auth;
using ChataloWeb.Helpers;
using ChataloWeb.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace ChataloWeb.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;

        public AuthController(UserManager<AppUser> userManager, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions)
        {
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
        }

        // POST api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Post([FromBody]LoginRequest loginRequest)
        {
            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("Summary", "Invalid input");
                return BadRequest(ModelState);
            }

            var identity = await GetClaimsIdentity(loginRequest.Email, loginRequest.Password);
            if (identity == null)
            {
                return BadRequest(Errors.AddErrorToModelState("Summary", "Invalid username or password.", ModelState));
            }
      
            
            var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, loginRequest.Email, _jwtOptions);
            return new OkObjectResult(jwt);
        }
        // POST api/auth/login
        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var appUser = await _userManager.FindByIdAsync(this.User.Claims.First(cl => cl.Type == Helpers.Constants.Strings.JwtClaimIdentifiers.Id).Value);
            var refreshToken = User.Claims.First(cl => cl.Type == Helpers.Constants.Strings.JwtClaimIdentifiers.Refresh).Value;
            await _userManager.RemoveAuthenticationTokenAsync(appUser, "RefreshTokenProvider", refreshToken);
            return Ok();
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody]RefreshRequest refreshRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userToRefresh = await _userManager.FindByIdAsync(refreshRequest.Id);
            var foundToken = _userManager.GetAuthenticationTokenAsync(userToRefresh, "RefreshTokenProvider", refreshRequest.RefreshToken);
            if (foundToken == null)
            {
                return BadRequest(Errors.AddErrorToModelState("Summary", "Invalid refresh token.", ModelState));
            }
            var identity =  await GetClaimsIdentity(userToRefresh);
            var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, userToRefresh.Email, _jwtOptions);
            return new OkObjectResult(jwt); 
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(AppUser appUser)
        {
            string refreshToken = Guid.NewGuid().ToString();
            await _userManager.SetAuthenticationTokenAsync(appUser, "RefreshTokenProvider", "RefreshToken", refreshToken);
            return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(appUser.Email, appUser.Id, refreshToken));
        }

        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
        {
            if (string.IsNullOrEmpty(userName) || string.IsNullOrEmpty(password))
                return await Task.FromResult<ClaimsIdentity>(null);

            // get the user to verifty
            var userToVerify = await _userManager.FindByNameAsync(userName);
            var person = userToVerify.Person;
            var firstname = person.FirstName;
            if (userToVerify == null) return await Task.FromResult<ClaimsIdentity>(null);

            // check the credentials
            if (await _userManager.CheckPasswordAsync(userToVerify, password))
            {
                return await GetClaimsIdentity(userToVerify);
            }

            // Credentials are invalid, or account doesn't exist
            return await Task.FromResult<ClaimsIdentity>(null);
        }
    }
}