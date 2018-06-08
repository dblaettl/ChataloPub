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
    }
}
