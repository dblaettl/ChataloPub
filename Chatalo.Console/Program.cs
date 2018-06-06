using Chatalo.Repository;
using Chatalo.Repository.Data;
using System;
using System.Threading.Tasks;

namespace Chatalo.ConsoleApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            System.Console.WriteLine("Hello World");
            var repository = new ChataloRepository(null);
            var pesonToAdd = new Person() { FirstName = "David", LastName = "Blaettler", City = "El Cajon", State = "California" };
            var addedPerson = repository.AddPersonAsync(pesonToAdd).Result;
            Console.WriteLine(addedPerson.PersonId);
            var persons = repository.GetAllPersonsAsync().Result;
            foreach(var person in persons)
            {
                Console.WriteLine(person.FirstName + " " + person.LastName);
            }
        }
    }
}
