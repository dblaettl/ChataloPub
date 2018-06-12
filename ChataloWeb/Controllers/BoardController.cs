using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chatalo.Repository;
using Chatalo.Repository.Data;
using ChataloWeb.Models;
using Microsoft.AspNetCore.Authorization;
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

        // POST: api/Category
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Add([FromBody]BoardModel model)
        {
            if (!ModelState.IsValid)
            {
                ModelState.AddModelError("Summary", "Failed adding board");
                return BadRequest(ModelState);
            }
            var board = model.ToBoard();
            var addedBoard = await _Repository.AddBoardAsync(board);
            return new OkObjectResult(addedBoard.ToBoardModel());
        }
    }
}
