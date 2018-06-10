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
        [HttpGet("{id}", Name = "GetDiscussion")]
        public async Task<DiscussionModel> Get(int id)
        {
            var discussion = await _Repository.GetDiscussionAsync(id);
            return discussion.ToDiscussionModel();
        }

        // GET: api/Discussion/5
        [HttpGet("{id}/posts", Name = "GetPosts")]
        public async Task<IEnumerable<PostModel>> GetPosts(int id)
        {
            var posts = await _Repository.GetPostsForDiscussionAsync(id);
            return posts.Select(p => p.ToPostModel()).ToList();
        }

        // POST: api/Discussion
        [HttpPost]
        [Authorize]
        public async Task<DiscussionModel> Add([FromBody]DiscussionModel model)
        {
            var person = await _Repository.GetPersonForClaimsPrincipalAsync(this.User);
            var discussion = model.ToDiscussion();
            discussion.DateCreated = DateTime.UtcNow;
            discussion.CreatedByPersonId = person.PersonId;
             var addedDiscussion = await _Repository.AddDiscussion(discussion);
            return addedDiscussion.ToDiscussionModel();
        }
    }
}
