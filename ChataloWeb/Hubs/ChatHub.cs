using Chatalo.Repository;
using Chatalo.Repository.Data;
using ChataloWeb.Helpers;
using ChataloWeb.Models;
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
        private static IDictionary<int, Person> _PersonsOnline = new Dictionary<int, Person>();

        private IChataloRepository _ChataloRepository;
        public ChatHub(IChataloRepository chataloRepository)
        {
            _ChataloRepository = chataloRepository;
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var person = await _ChataloRepository.GetPersonForClaimsPrincipalAsync(Context.User);
            _PersonsOnline.Remove(person.PersonId);
            await Clients.All.SendAsync("UserLeft", person.PersonId);
            await base.OnDisconnectedAsync(exception);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task SendMessage(string text)
        {
            var person = await _ChataloRepository.GetPersonForClaimsPrincipalAsync(Context.User);
            var message = new Message() { Person = person, Text = text };
            var storedMessage = await _ChataloRepository.AddMessageAsync(message);
            await Clients.All.SendAsync("ReceiveMessage", storedMessage.ToMessageModel() );
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task EnteredChannel()
        {
            var person = await _ChataloRepository.GetPersonForClaimsPrincipalAsync(Context.User);
            await Clients.Caller.SendAsync("CurrentUsers", _PersonsOnline.Values.Select(p => p.ToPersonModel()));
            _PersonsOnline[person.PersonId] = person;
            await Clients.All.SendAsync("UserJoined", person.ToPersonModel());
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task LeftChannel()
        {
            var person = await _ChataloRepository.GetPersonForClaimsPrincipalAsync(Context.User);
            _PersonsOnline.Remove(person.PersonId);
            await Clients.All.SendAsync("UserLeft", person.PersonId );
        }
    }
}
