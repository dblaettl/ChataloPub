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
    public class BoardController : Controller
    {

        private readonly IChataloRepository _Repository;

        public BoardController(IChataloRepository repository)
        {
            _Repository = repository;
        }

        // GET: api/Board
        [HttpGet]
        public async Task<IEnumerable<BoardModel>> Get()
        {
            var boards = await _Repository.GetAllBoardsAsync();
            return boards.Select(p => p.ToBoardModel()).ToList();
        }

        // GET: api/Board
        [HttpGet("{id}/categories")]
        public async Task<IEnumerable<BoardCategoryModel>> Categories(int id)
        {
            var categories = await _Repository.GetCategoriesForBoardAsync(id);
            return categories.Select(p => p.ToBoardCategoryModel()).ToList();
        }


        // GET: api/Board/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Board
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Board/5
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
