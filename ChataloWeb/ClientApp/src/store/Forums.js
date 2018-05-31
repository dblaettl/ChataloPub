const requestBoardsType = 'REQUEST_BOARDS_TYPE';
const receiveBoardsType = 'RECEIVE_BOARDS_TYPE';
const requestCategoriesForBoardType = 'REQUEST_CATEGORIES_FOR_BOARD_TYPE';
const receiveCategoriesForBoardType = 'RECEIVE_CATEGORIES_FOR_BOARD_TYPE';
const requestDiscussionsForCategoryType = 'REQUEST_DISCUSSSION_FOR_CATEGORY_TYPE';
const receiveDiscussonsForCategoryType = 'RECEIVE_DISCUSSIONS_FOR_CATEGORY_TYPE';
const requestDiscussionType = 'REQUEST_DISCUSSION_TYPE';
const receiveDiscussionType = 'RECEIVE_DISCUSSION_TYPE';
const requestPostsForDiscussionType = 'REQUEST_POSTS_FOR_DISCUSSION_TYPE';
const receivePostsForDiscussionType = 'RECEIVE_POSTS_FOR_DISCUSSION_TYPE';
const addDiscussionType = 'ADD_DISCUSSION_TYPE';
const addPostType = 'ADD_POST_TYPE';

const initialState = { boards: { byId: [], byHash: {} }, categories: { byId: [], byHash: {} }, discussions: { byId: [], byHash: {} }, posts: { byId: [], byHash: {} }, forumId: null, isLoading: false,  discussionId: 0 };

export const actionCreators = {
    addDiscussion: (discussion) => async (dispatch, getState) => {
        const url = `api/discussion`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(discussion)
        });
        const returnedDiscussion = await response.json();
        dispatch({ type: addDiscussionType, returnedDiscussion });
    },
    addPost: (post) => async (dispatch, getState) => {
        const url = `api/post`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        const returnedPost = await response.json();
        dispatch({ type: addPostType, returnedPost });
    },
    getBoards: () => async (dispatch, getState) => {   
        dispatch({ type: requestBoardsType });
        const url = `api/board`;
        const response = await fetch(url);
        const boards = await response.json();
        dispatch({ type: receiveBoardsType, boards });
    },
    getDiscussion: (id) => async (dispatch, getState) => {
        if (getState().forums.discussionId !== id) {
            dispatch({ type: requestDiscussionType, discussionId: id });
            const url = `api/discussion/${id}`;
            const response = await fetch(url);
            const discussion = await response.json();
            dispatch({ type: receiveDiscussionType, discussion });
        }
    },
    getCategoriesForBoard: (boardId) => async (dispatch, getState) => {
        dispatch({ type: requestCategoriesForBoardType, boardId: boardId });
        const url = `api/board/${boardId}/categories`;
        const response = await fetch(url);
        const categories = await response.json();
        dispatch({ type: receiveCategoriesForBoardType, boardId: boardId, categories: categories });
    },
    getPostsForDiscussion: (discussionId) => async (dispatch, getState) => {
        dispatch({ type: requestPostsForDiscussionType, discussionId: discussionId });
        const url = `api/discussion/${discussionId}/posts`;
        const response = await fetch(url);
        const posts = await response.json();
        dispatch({ type: receivePostsForDiscussionType, discussionId: discussionId, posts: posts });
    },
    getDiscussionsForCategory: (categoryId, offset, limit) => async (dispatch, getState) => {
        let currentDiscussions = getState().forums.categories.byHash[categoryId].discussions;
        if (currentDiscussions === undefined) {
            dispatch({ type: requestDiscussionsForCategoryType, boardId: 1, categoryId: categoryId });
            const url = `api/category/${categoryId}/discussions`;
            const response = await fetch(url);
            const discussions = await response.json();
            dispatch({ type: receiveDiscussonsForCategoryType, boardId: 1, categoryId: categoryId, discussions: discussions });
        }
    }
};

function updateHash(stateEntities, id, val) {
    return {
        ...stateEntities,
        byHash: {
            ...stateEntities.byHash,
            [id]:  val
        }
    };
}

const itemToMap = (item, keyField) => {
    let map = {};
    map[item[keyField]] = item;
    return map;
};

const arrayToMap = (array, keyField) =>
    array.reduce((obj, item) => {
        obj[item[keyField]] = item;
        return obj;
    }, {});

export const reducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {

        case requestBoardsType:
            return {
                ...state,
                boards: { byId: [], byHash: {} },
                isLoading: true
            };

        case receiveBoardsType:
            return {
                ...state,
                boards: { byId: action.boards.map(b => b.boardId), byHash: arrayToMap(action.boards, 'boardId') },
                isLoading: false
            };

        case requestCategoriesForBoardType:
            return {
                ...state,
                boards: updateHash(state.boards, action.boardId, { ...state.boards.byHash[action.boardId], categories: [] }),
                isLoading: true
            };

        case receiveCategoriesForBoardType:
            return {
                ...state,
                boards: updateHash(state.boards, action.boardId, { ...state.boards.byHash[action.boardId], categories: action.categories.map(c => c.boardCategoryId)}),
                categories: {
                    ...state.categories,
                    byHash: { ...state.categories.byHash, ...arrayToMap(action.categories, 'boardCategoryId') }
                },
                isLoading: false
            };

        case requestDiscussionsForCategoryType:
            return {
                ...state,
                categories: updateHash(state.categories, action.categoryId, { ...state.categories.byHash[action.categoryId], discussions: [] }),
                isLoading: true
            };

        case receiveDiscussonsForCategoryType:
            return {
                ...state,
                categories: updateHash(state.categories, action.categoryId, { ...state.categories.byHash[action.categoryId], discussions: action.discussions.map(d => d.discussionId) }),
                discussions: {
                    ...state.discussions, byHash: { ...state.discussions.byHash, ...arrayToMap(action.discussions, 'discussionId') }
                },
                isLoading: false
            };

        case requestPostsForDiscussionType:
            return {
                ...state,
                discussions: updateHash(state.discussions, action.discussionId, { ...state.discussions.byHash[action.discussionId], posts: [] }),
                isLoading: true
            };

        case receivePostsForDiscussionType:
            return {
                ...state,
                discussions: updateHash(state.discussions, action.discussionId, { ...state.discussions.byHash[action.discussionId], posts: action.posts.map(p => p.postId) }),
                posts: {
                    ...state.posts, byHash: { ...state.posts.byHash, ...arrayToMap(action.posts, 'postId') }
                },
                isLoading: false
            };

        case addDiscussionType:
            return {
                ...state,
                discussion: action.returnedDiscussion
            };

        case addPostType:
            return {
                ...state,
                discussions: updateHash(state.discussions, action.returnedPost.discussionId, { ...state.discussions.byHash[action.returnedPost.discussionId], posts: state.discussions.byHash[action.returnedPost.discussionId].posts.concat(action.returnedPost.postId) }),
                posts: { ...state.posts, byHash: { ...state.posts.byHash, ...itemToMap(action.returnedPost, 'postId') } },
                isLoading: false
            };

        case requestDiscussionType:
            return {
                ...state,
                discussionId: action.discussionId,
                isLoading: true
            };

        case receiveDiscussionType:
            return {
                ...state,
                discussions: updateHash(state.discussions, action.discussion.discussionId, { ...state.discussions.byHash[action.discussion.discussionId], ...action.discussion }),
                isLoading: false
            };
        default:
            return state;
    }
};
