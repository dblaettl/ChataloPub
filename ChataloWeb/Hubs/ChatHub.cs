using Chatalo.Repository;
using Chatalo.Repository.Data;
using ChataloWeb.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChataloWeb.Hubs
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [AllowAnonymous]
    public class ChatHub : Hub
    {
        private IChataloRepository _ChataloRepository;
        public ChatHub(IChataloRepository chataloRepository)
        {
            _ChataloRepository = chataloRepository;
        }


        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task SendMessage(string text)
        {
            var person = await _ChataloRepository.GetPersonForClaimsPrincipalAsync(Context.User);
            var message = new Message() { PersonId = person.PersonId, Text = text };
            await Clients.All.SendAsync("ReceiveMessage", new { personId = person.PersonId, message = text });
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task EnteredChannel()
        {
            var person = await _ChataloRepository.GetPersonForClaimsPrincipalAsync(Context.User);
            await Clients.All.SendAsync("UserJoined", new { personId = person.PersonId });
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task LeftChannel()
        {
            var person = await _ChataloRepository.GetPersonForClaimsPrincipalAsync(Context.User);
            await Clients.All.SendAsync("UserLeft", new { personId = person.PersonId });
        }
    }
}
