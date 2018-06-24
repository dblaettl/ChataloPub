using Chatalo.Repository.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChataloWeb.Models
{

    public static class MessageModelExtensions
    {
        public static MessageModel ToMessageModel(this Message message)
        {
            return new MessageModel()
            {
                MessageId = message.MessageId,
                Person = message.Person.ToPersonModel(),
                Text = message.Text,
                DateCreated = message.DateCreated
            };
        }
    }
    public class MessageModel
    {
        public int MessageId { get; set; }
        public PersonModel Person { get; set; }
        public string Text { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
