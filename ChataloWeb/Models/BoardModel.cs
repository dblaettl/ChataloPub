using Chatalo.Repository.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChataloWeb.Models
{

    public static class BoardModelExtensions
    {
        public static BoardModel ToBoardModel(this Board board)
        {
            return new BoardModel()
            {
                BoardId = board.BoardId,
                Name = board.Name,
                Description = board.Description
            };
        }
    }
    public class BoardModel
    {
        public int BoardId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
