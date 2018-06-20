using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChataloWeb.Models.Validators
{
    public class PostModelValidator : AbstractValidator<PostModel>
    {
        public PostModelValidator()
        {
            RuleFor(vm => vm.DiscussionId).GreaterThan(0).WithMessage("DiscussionId is required");
            RuleFor(vm => vm.Message).NotEmpty().WithMessage("Message cannot be empty");
        }
    }
}
