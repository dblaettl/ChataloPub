using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chatalo.Repository;
using Chatalo.Repository.Data;
using ChataloWeb.Helpers;
using ChataloWeb.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChataloWeb.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class DiscussionController : Controller
    {

        private readonly IChataloRepository _Repository;

        public DiscussionController(IChataloRepository repository)
        {
            _Repository = repository;
        }

        // GET: api/Discussion/5
        [HttpGet("{id}", Name = "GetDiscussionById")]
        public async Task<DiscussionModel> Get(int id)
        {
            var discussion = await _Repository.GetDiscussionAsync(id);
            return discussion.ToDiscussionModel();
        }

        // GET: api/Discussion/5
        [HttpGet("{id}/posts", Name = "GetPostsByDiscussionId")]
        public async Task<IEnumerable<PostModel>> GetPosts(int id)
        {
            var posts = await _Repository.GetPostsForDiscussionAsync(id);
            return posts.Select(p => p.ToPostModel()).ToList();
        }

        // POST: api/Discussion
        [HttpPost(Name = "AddDiscussion")]
        [Authorize]
        public async Task<IActionResult> Add([FromBody]DiscussionModel model)
        {
            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("Summary", "Failed adding discussion");
                return BadRequest(ModelState);
            }
            var person = await _Repository.GetPersonForClaimsPrincipalAsync(this.User);
            var discussion = model.ToDiscussion();
            discussion.CreatedByPersonId = person.PersonId;
             var addedDiscussion = await _Repository.AddDiscussionAsync(discussion);
            return new OkObjectResult(addedDiscussion.ToDiscussionModel());
        }
    }
}
