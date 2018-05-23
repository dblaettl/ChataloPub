using Chatalo.Repository.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chatalo.Repository
{
    public class ChataloRepository : IChataloRepository
    {
        private ChataloContext _Context;

        public ChataloRepository(ChataloContext context)
        {
            _Context = context;
        }

        public async Task<Person> AddPersonAsync(Person person)
        {
            var entity = await _Context.Persons.AddAsync(person);
            await _Context.SaveChangesAsync();
            return entity.Entity;
        }

        public async Task<bool> DeletePersonAsync(int id)
        {
            var foundPerson = await _Context.Persons.Where(p => p.PersonId == id).SingleOrDefaultAsync();
            if (foundPerson != null)
            {
                _Context.Persons.Remove(foundPerson);
                await _Context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<Person> EditPersonAsync(int id, Person person)
        {
            var foundPerson = await _Context.Persons.Where(p => p.PersonId == id).SingleAsync();
            foundPerson.FirstName = person.FirstName;
            foundPerson.LastName = person.LastName;
            foundPerson.Email = person.Email;
            foundPerson.City = person.City;
            foundPerson.State = person.State;
            await _Context.SaveChangesAsync();
            return foundPerson;
        }


        public async Task<IList<Person>> GetAllPersonsAsync()
        {
            return await _Context.Persons.ToListAsync();
        }

        public async Task<Person> GetPersonAsync(int id)
        {
            return await _Context.Persons.Where(p => p.PersonId == id).SingleAsync();
        }

    }
}
