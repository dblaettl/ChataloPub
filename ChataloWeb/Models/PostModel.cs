using Chatalo.Repository.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChataloWeb.Models
{

    public static class PostModelExtensions
    {
        public static PostModel ToPostModel(this Post post)
        {
            return new PostModel()
            {
                PostId = post.PostId,
                DiscussionId = post.DiscussionId,
                CreatedByPersonId = post.CreatedByPersonId,
                Message = post.Message,
                DateCreated = post.DateCreated
            };
        }

        public static Post ToPost(this PostModel postModel)
        {
            return new Post()
            {
                PostId = postModel.PostId,
                DiscussionId = postModel.DiscussionId,
                Message = postModel.Message,
                DateCreated = postModel.DateCreated
            };
        }
    }

    public class PostModel
    {
        public int PostId { get; set; }
        public int DiscussionId { get; set; }
        public string Message { get; set; }
        public int CreatedByPersonId { get; set; }
        public DateTime DateCreated { get; set; } 
    }
}
