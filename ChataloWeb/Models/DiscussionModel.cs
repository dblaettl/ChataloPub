using Chatalo.Repository.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChataloWeb.Models
{

    public static class DiscussionModelExtensions
    {
        public static DiscussionModel ToDiscussionModel(this Discussion discussion)
        {
            return new DiscussionModel()
            {
                BoardCategoryId = discussion.BoardCategoryId,
                DiscussionId = discussion.DiscussionId,
                Title = discussion.Title,
                Message = discussion.Message,
                NumPosts = discussion.NumPosts,
                NumViews = discussion.NumViews,
                DateCreated = discussion.DateCreated
            };
        }

        public static Discussion ToDiscussion(this DiscussionModel discussionModel)
        {
            return new Discussion()
            {
                BoardCategoryId = discussionModel.BoardCategoryId,
                DiscussionId = discussionModel.DiscussionId,
                Title = discussionModel.Title,
                Message = discussionModel.Message
            };
        }
    }

    public class DiscussionModel
    {
        public int DiscussionId { get; set; }
        public int BoardCategoryId { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public int NumViews { get; set; }
        public int NumPosts { get; set; }
        public DateTime DateCreated { get; set; } 
    }
}
