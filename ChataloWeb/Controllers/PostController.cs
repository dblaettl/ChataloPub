using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chatalo.Repository;
using ChataloWeb.Helpers;
using ChataloWeb.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChataloWeb.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class PostController : Controller
    {
        private readonly IChataloRepository _Repository;

        public PostController(IChataloRepository repository)
        {
            _Repository = repository;
        }



        // POST: api/Post
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody]PostModel model)
        {
            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("Summary", "Failed adding post");
                return BadRequest(ModelState);
            }
            var person = await _Repository.GetPersonForClaimsPrincipalAsync(this.User);
            var post = model.ToPost();
            post.CreatedByPersonId = person.PersonId;
            var addedPost = await _Repository.AddPostAsync(post);
            return new OkObjectResult(addedPost.ToPostModel());
        }
    }
}
