using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chatalo.Repository;
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
    public class AccountsController : Controller
    {
        private readonly IChataloRepository _ChataloRepository;
        private readonly IJwtFactory _jwtFactory;
        private readonly UserManager<AppUser> _userManager;
        private readonly JwtIssuerOptions _jwtOptions;

        public AccountsController(UserManager<AppUser> userManager, IJwtFactory jwtFactory, IChataloRepository chataloRepository, IOptions<JwtIssuerOptions> jwtOptions)
        {
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _ChataloRepository = chataloRepository;
            _jwtOptions = jwtOptions.Value;
        }

        [HttpGet("user")]
        [Authorize]
        public async Task<IActionResult> GetUser()
        {
            var appUser = await _userManager.FindByIdAsync(this.User.Claims.First(cl => cl.Type == Helpers.Constants.Strings.JwtClaimIdentifiers.Id).Value);
            var userModel = new UserModel()
            {
                Id = appUser.Id,
                Email = appUser.Email,
                FirstName = appUser.Person.FirstName,
                LastName = appUser.Person.LastName,
                City = appUser.Person.City,
                State = appUser.Person.State,
                DateCreated = appUser.Person.DateCreated
            };
            return new OkObjectResult(userModel);
        }

        // POST api/accounts
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RegistsrationRequest model)
        {
            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("Summary", "Registration failed");
                return BadRequest(ModelState);
            }

            var userIdentity = new AppUser()
            {
                UserName = model.Email,
                Email = model.Email,
            };

            var result = await _userManager.CreateAsync(userIdentity, model.Password);
            if (result.Succeeded)
            {
                var person = new Person()
                {
                    AppUserId  = userIdentity.Id,
                    City = model.City,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    State = model.State
                };
                await _ChataloRepository.AddPersonAsync(person);
                string refreshToken = Guid.NewGuid().ToString();
                await _userManager.SetAuthenticationTokenAsync(userIdentity, "RefreshTokenProvider", "RefreshToken", refreshToken);
                var identity = _jwtFactory.GenerateClaimsIdentity(userIdentity.Email, userIdentity.Id, refreshToken);
                var jwt = await Tokens.GenerateJwt(identity, _jwtFactory, userIdentity.Email, _jwtOptions);            
                return new OkObjectResult(jwt);
            } else
            {
                return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));
            }
           
        }
    }
}
