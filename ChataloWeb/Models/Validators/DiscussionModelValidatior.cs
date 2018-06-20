using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChataloWeb.Models.Validators
{
    public class DiscussionModelValidatior : AbstractValidator<DiscussionModel>
    {
        public DiscussionModelValidatior()
        {
            RuleFor(vm => vm.BoardCategoryId).GreaterThan(0).WithMessage("BoardCategoryId is required");
            RuleFor(vm => vm.Title).NotEmpty().WithMessage("Title cannot be empty");
            RuleFor(vm => vm.Message).NotEmpty().WithMessage("Message cannot be empty");
        }
    }
}
