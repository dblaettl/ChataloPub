using Chatalo.Repository.Data;
using ChataloWeb.Models.Validators;
using FluentValidation.Attributes;
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

        public static Board ToBoard(this BoardModel model)
        {
            return new Board()
            {
                BoardId = model.BoardId,
                Name = model.Name,
                Description = model.Description
            };
        }
    }

    [Validator(typeof(BoardModelValidator))]
    public class BoardModel
    {
        public int BoardId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
