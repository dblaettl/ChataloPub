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
    public class CategoryController : Controller
    {

        private readonly IChataloRepository _Repository;

        public CategoryController(IChataloRepository repository)
        {
            _Repository = repository;
        }

        // GET: api/Category
        [HttpGet]
        public async Task<IEnumerable<BoardModel>> Get()
        {
            var boards = await _Repository.GetAllBoardsAsync();
            return boards.Select(b => b.ToBoardModel()).ToList();
        }

        // GET: api/Category/1/discussions
        [HttpGet("{id}/discussions")]
        public async Task<IEnumerable<DiscussionModel>> Discussions(int id)
        {
            var discussions = await _Repository.GetDiscussionsForBoardCategoryAsync(id);
            return discussions.Select(d => d.ToDiscussionModel()).ToList();
        }


        // GET: api/Category/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Category
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Category/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
