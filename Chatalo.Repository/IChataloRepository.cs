using System.Collections.Generic;
using System.Threading.Tasks;
using Chatalo.Repository.Data;

namespace Chatalo.Repository
{
    public interface IChataloRepository
    {
        Task<Person> AddPersonAsync(Person person);
        Task<Person> EditPersonAsync(int id, Person person);
        Task<IList<Person>> GetAllPersonsAsync();
        Task<Person> GetPersonAsync(int id);
        Task<bool> DeletePersonAsync(int id);
    }
}