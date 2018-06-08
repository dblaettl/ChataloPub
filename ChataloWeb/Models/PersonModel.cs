﻿using Chatalo.Repository.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChatloWeb.Models
{
    public static class PersonExtensions
    {
        public static PersonModel ToPersonModel(this Person person)
        {
            return new PersonModel() {
                PersonId = person.PersonId,
                FirstName = person.FirstName,
                LastName = person.LastName,
                City = person.City,
                State = person.State,
                DateCreated = person.DateCreated
            };
        }
        public static Person ToPerson(this PersonModel person)
        {
            return new Person()
            {
                PersonId = person.PersonId,
                FirstName = person.FirstName,
                LastName = person.LastName,
                City = person.City,
                State = person.State
            };

        }
    }

    public class PersonModel
    {
        public int PersonId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
