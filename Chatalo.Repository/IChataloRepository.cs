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
        Task<Person> GetPersonByAppUseridAsync(string appUserid);
        Task<IList<Person>> GetAllPersonsAsync();

        Task<IList<Board>> GetAllBoardsAsync();
        Task<Board> AddBoardAsync(Board board);
        Task<IList<BoardCategory>> GetCategoriesForBoardAsync(int boardId);
        Task<BoardCategory> AddBoardCategoryAsync(BoardCategory category);
        Task<IList<Discussion>> GetDiscussionsForBoardCategoryAsync(int boardCategoryId);
        Task<Discussion> AddDiscussionAsync(Discussion discussion);
        Task<Discussion> GetDiscussionAsync(int id);
        Task<Post> AddPostAsync(Post post);
        Task<IList<Post>> GetPostsForDiscussionAsync(int discussionId);
    

    }
}