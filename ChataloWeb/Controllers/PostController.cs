﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chatalo.Repository;
using ChataloWeb.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ChataloWeb.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class PostController : Controller
    {
        private readonly IChataloRepository _Repository;

        public PostController(IChataloRepository repository)
        {
            _Repository = repository;
        }



        // POST: api/Post
        [Authorize]
        [HttpPost]
        public async Task<PostModel> Add([FromBody]PostModel model)
        {
            var appUserId = this.User.Claims.First(cl => cl.Type == Helpers.Constants.Strings.JwtClaimIdentifiers.Id).Value;
            var person = await _Repository.GetPersonByAppUseridAsync(appUserId);
            var post = model.ToPost();
            post.DateCreated = DateTime.UtcNow;
            post.CreatedByPersonId = person.PersonId;
            var addedPost = await _Repository.AddPost(post);
            return addedPost.ToPostModel();
        }
    }
}
