using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChataloWeb.Models.Validators
{
    public class RegistrationRequestValidator : AbstractValidator<RegistsrationRequest>
    {
        public RegistrationRequestValidator()
        {
            RuleFor(vm => vm.Email).NotEmpty().WithMessage("Email cannot be empty");
            RuleFor(vm => vm.Password).NotEmpty().WithMessage("Password cannot be empty");
            RuleFor(vm => vm.FirstName).NotEmpty().WithMessage("FirstName cannot be empty");
            RuleFor(vm => vm.LastName).NotEmpty().WithMessage("LastName cannot be empty");
            RuleFor(vm => vm.City).NotEmpty().WithMessage("City cannot be empty");
            RuleFor(vm => vm.City).NotEmpty().WithMessage("State cannot be empty");
        }
    }
}
