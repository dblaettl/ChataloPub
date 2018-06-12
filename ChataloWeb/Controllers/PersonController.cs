using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chatalo.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ChatloWeb.Models;

namespace ChatloWeb.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class PersonController : Controller
    {
        private readonly IChataloRepository _Repository;

        public PersonController(IChataloRepository repository)
        {
            _Repository = repository;
        }
        [HttpGet]
        // GET: User
        public async Task<ActionResult> Index(int offset = 0, int limit = 20)
        {
            var people = await _Repository.GetAllPersonsAsync();
            return Ok(people.Select(p => p.ToPersonModel()).ToList());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Details(int id)
        {
            var person = await _Repository.GetPersonAsync(id); 
            return Ok(person.ToPersonModel());
        }


 
        [HttpPost]
        public async Task<ActionResult> Create([FromBody]PersonModel person)
        {
            try
            {
                var addedPerson = await _Repository.AddPersonAsync(person.ToPerson());
                return Ok(addedPerson.ToPersonModel());
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Edit(int id, [FromBody]PersonModel person)
        {
            try
            {
                var editedPerson = await _Repository.EditPersonAsync(id, person.ToPerson());
                return Ok(editedPerson.ToPersonModel());
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}