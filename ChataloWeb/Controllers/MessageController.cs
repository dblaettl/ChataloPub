using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chatalo.Repository;
using ChataloWeb.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChataloWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IChataloRepository _Repository;

        public MessageController(IChataloRepository repository)
        {
            _Repository = repository;
        }

        // GET: api/Message
        [HttpGet]
        public async Task<IEnumerable<MessageModel>> Get()
        {
            var messages = await _Repository.GetRecentMessagesAsync();
            return messages.Select(p => p.ToMessageModel()).ToList();
        }
    }
}