using System.Collections.Generic;
using System.Threading.Tasks;
using Chatalo.Repository.Data;

namespace Chatalo.Repository
{
    public interface IChataloRepository
    {
        Task<Person> GetPersonAsync(int id);
        Task<Person> AddPersonAsync(Person person);
        Task<Person> EditPersonAsync(int id, Person person);
        Task<IList<Person>> GetAllPersonsAsync();
        Task<bool> DeletePersonAsync(int id);

        Task<IList<Board>> GetAllBoardsAsync();
        Task<IList<BoardCategory>> GetCategoriesForBoardAsync(int boardId);
        Task<IList<Discussion>> GetDiscussionsForBoardCategoryAsync(int boardCategoryId);
        Task<Discussion> AddDiscussion(Discussion discussion);
        Task<Discussion> GetDiscussionAsync(int id);
        Task<Post> AddPost(Post post);
        Task<IList<Post>> GetPostsForDiscussionAsync(int discussionId);
    

    }
}