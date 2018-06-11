using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChataloWeb.Models.Validators
{
    public class BoardCategoryModelValidator : AbstractValidator<BoardCategoryModel>
    {
        public BoardCategoryModelValidator()
        {
            RuleFor(vm => vm.BoardId).GreaterThan(0).WithMessage("BoardId is required");
            RuleFor(vm => vm.Name).NotEmpty().WithMessage("Name cannot be empty");
            RuleFor(vm => vm.Description).NotEmpty().WithMessage("Description cannot be empty");
        }
    }
}
