using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chatalo.Repository;
using Chatalo.Repository.Data;
using ChataloWeb.Models;
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
        public async Task<Discussion> Get(int id)
        {
            return await _Repository.GetDiscussionAsync(id);
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
        public async Task<DiscussionModel> Add([FromBody]DiscussionModel discussion)
        {
             var addedDiscussion = await _Repository.AddDiscussion(discussion.ToDiscussion());
            return addedDiscussion.ToDiscussionModel();
        }

        // PUT: api/Discussion/5
        [HttpPut("{id}")]
        public Discussion Edit(int id, [FromBody]Discussion discussion)
        {
            return discussion;
        }

        // PUT: api/Discussion/5
        [HttpPut("{id}/addpost")]
        public Post AddPost(int id, [FromBody]Post post)
        {
            return post;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return true;
        }
    }
}
