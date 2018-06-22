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
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Clients.All.SendAsync("UserLeft", "Left the channel");
            await base.OnDisconnectedAsync(exception);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task EnteredChannel()
        {
            await Clients.All.SendAsync("UserJoined", "Entered the channel");
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task LeftChannel()
        {
            await Clients.All.SendAsync("UserLeft", "Left the channel");
        }
    }
}
