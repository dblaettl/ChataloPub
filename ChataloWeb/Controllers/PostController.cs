using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chatalo.Repository;
using ChataloWeb.Models;
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

        // GET: api/Post
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Post/5
        [HttpGet("{id}", Name = "GetPost")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Post
        [HttpPost]
        public async Task<PostModel> Post([FromBody]PostModel post)
        {
            var addedPost = await _Repository.AddPost(post.ToPost());
            return addedPost.ToPostModel();
        }

        // PUT: api/Post/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Post/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
