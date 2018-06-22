using Chatalo.Repository.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chatalo.Repository
{
    public class ChataloRepository : IChataloRepository
    {
        private ChataloContext _Context;

        public ChataloRepository(ChataloContext context)
        {
            context.Database.Migrate();
            _Context = context;
        }

        public async Task<Person> AddPersonAsync(Person person)
        {
            var entity = await _Context.Persons.AddAsync(person);
            await _Context.SaveChangesAsync();
            return entity.Entity;
        }

        public async Task<Person> EditPersonAsync(int id, Person person)
        {
            var foundPerson = await _Context.Persons.Where(p => p.PersonId == id).SingleAsync();
            foundPerson.FirstName = person.FirstName;
            foundPerson.LastName = person.LastName;
            foundPerson.City = person.City;
            foundPerson.State = person.State;
            await _Context.SaveChangesAsync();
            return foundPerson;
        }


        public async Task<IList<Person>> GetAllPersonsAsync()
        {
            return await _Context.Persons.ToListAsync();
        }
        public async Task<IList<Board>> GetAllBoardsAsync()
        {
            return await _Context.Boards.ToListAsync();
        }

        public async Task<Person> GetPersonAsync(int id)
        {
            return await _Context.Persons.Where(p => p.PersonId == id).SingleAsync();
        }

        public async Task<IList<BoardCategory>> GetCategoriesForBoardAsync(int boardId)
        {
            return await _Context.BoardCategories.Where(bc => bc.BoardId == boardId).ToListAsync();
        }

        public async Task<IList<Discussion>> GetDiscussionsForBoardCategoryAsync(int boardCategoryId)
        {
            return await _Context.Discussions.Where(d => d.BoardCategoryId == boardCategoryId).ToListAsync();
        }

        public async Task<IList<Post>> GetPostsForDiscussionAsync(int discussionId)
        {
            return await _Context.Posts.Where(p => p.DiscussionId == discussionId).ToListAsync();
        }

        public async Task<Discussion> AddDiscussionAsync(Discussion discussion)
        {
            var entity = await _Context.Discussions.AddAsync(discussion);
            await _Context.SaveChangesAsync();
            return entity.Entity;
        }

        public async Task<Post> AddPostAsync(Post post)
        {
            post.DateCreated = DateTime.UtcNow; 
            var discussionTask = _Context.Discussions.Where(d => d.DiscussionId == post.DiscussionId).FirstAsync();
            var entity = await _Context.Posts.AddAsync(post);
            var discussionResult = discussionTask.Result;
            discussionResult.NumPosts = discussionResult.NumPosts + 1;
            await _Context.SaveChangesAsync();
            return entity.Entity;
        }

        public async Task<Discussion> GetDiscussionAsync(int id)
        {
            var discussion = await _Context.Discussions.Where(d => d.DiscussionId == id).FirstAsync();
            discussion.NumViews = discussion.NumViews + 1;
            await _Context.SaveChangesAsync();
            return discussion;
        }

        public async Task<Person> GetPersonByAppUseridAsync(string appUserid)
        {
            return await _Context.Persons.Where(p => p.AppUserId == appUserid).FirstAsync();
        }

        public async Task<BoardCategory> AddBoardCategoryAsync(BoardCategory category)
        {
            category.DateCreated = DateTime.UtcNow;
            var entity = await _Context.BoardCategories.AddAsync(category);
            await _Context.SaveChangesAsync();
            return entity.Entity;
        }

        public async Task<Board> AddBoardAsync(Board board)
        {
            board.DateCreated = DateTime.UtcNow;
            var entity = await _Context.Boards.AddAsync(board);
            await _Context.SaveChangesAsync();
            return entity.Entity;
        }

        public async Task<Message> AddMessageAsync(Message message)
        {
            var entity = await _Context.Messages.AddAsync(message);
            await _Context.SaveChangesAsync();
            return entity.Entity;
        }
    }
}
