using Chatalo.Repository.Data;
using ChataloWeb.Models.Validators;
using FluentValidation.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChataloWeb.Models
{

    public static class BoardCategoryModelExtensions
    {
        public static BoardCategoryModel ToBoardCategoryModel(this BoardCategory category)
        {
            return new BoardCategoryModel()
            {
                BoardCategoryId = category.BoardCategoryId,
                BoardId = category.BoardId,
                Name = category.Name,
                Description = category.Description
            };
        }

        public static BoardCategory ToBoardCategory(this BoardCategoryModel model)
        {
            return new BoardCategory()
            {
                BoardCategoryId = model.BoardCategoryId,
                BoardId = model.BoardId,
                Name = model.Name,
                Description = model.Description
            };
        }
    }
    [Validator(typeof(BoardCategoryModelValidator))]
    public class BoardCategoryModel
    {
        public int BoardCategoryId { get; set; }
        public int BoardId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
