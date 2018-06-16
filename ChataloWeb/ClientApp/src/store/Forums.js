import { arrayToMap, updateHash, itemToMap } from './storeHelpers';
import ChataloAPI from './ChataloAPI';

const requestBoardsType = 'REQUEST_BOARDS_TYPE';
const receiveBoardsType = 'RECEIVE_BOARDS_TYPE';
const requestCategoriesForBoardType = 'REQUEST_CATEGORIES_FOR_BOARD_TYPE';
const receiveCategoriesForBoardType = 'RECEIVE_CATEGORIES_FOR_BOARD_TYPE';
const requestDiscussionsForCategoryType = 'REQUEST_DISCUSSSION_FOR_CATEGORY_TYPE';
const receiveDiscussonsForCategoryType = 'RECEIVE_DISCUSSIONS_FOR_CATEGORY_TYPE';
const requestDiscussionType = 'REQUEST_DISCUSSION_TYPE';
const receiveDiscussionType = 'RECEIVE_DISCUSSION_TYPE';
const requestPersonType = 'REQUEST_PERSON_TYPE';
const receivePersonType = 'RECEIVE_PERSON_TYPE';
const requestPostsForDiscussionType = 'REQUEST_POSTS_FOR_DISCUSSION_TYPE';
const receivePostsForDiscussionType = 'RECEIVE_POSTS_FOR_DISCUSSION_TYPE';
const addDiscussionType = 'ADD_DISCUSSION_TYPE';
const addCategoryType = 'ADD_CATEGORY_TYPE';
const addPostType = 'ADD_POST_TYPE';
const addBoardType = 'ADD_BOARD_TYPE';
const updateErrorDataType = 'UPDATE_ERROR_DATA';
const setShowDialogType = 'SET_SHOW_DIALOG';

const initialState = {
    boards: { byId: [], byHash: {} },
    categories: { byId: [], byHash: {} },
    discussions: { byId: [], byHash: {} },
    posts: { byId: [], byHash: {} },
    persons: { byId: [], byHash: {} },
    numLoading: 0,
    showDialog: false,
    errorData: null
};

export const actionCreators = {

    addDiscussion: (discussion) => async (dispatch, getState) => {
        ChataloAPI.post(`api/discussion`, discussion)
            .then(
                response => {
                    const returnedDiscussion = response.data;
                    dispatch({ type: addDiscussionType, returnedDiscussion });
                }
            );       
    },

    addCategory: (category) => async (dispatch, getState) => {
        ChataloAPI.post(`api/category`, category)
            .then(
                response => {
                    const returnedCategory = response.data;
                    dispatch({ type: addCategoryType, returnedCategory });
                }
            );
    },

    addBoard: (board) => async (dispatch, getState) => {
        ChataloAPI.post(`api/board`, board)
            .then(
            response => {
                const returnedBoard = response.data;
                dispatch({ type: addBoardType, returnedBoard });
            }
        );
    },

    addPost: (post) => async (dispatch, getState) => {
        ChataloAPI.post(`api/post`, post )
            .then(res => {
                const returnedPost = res.data;
                const personsByHash = getState().forums.persons.byHash;
                if (personsByHash[returnedPost.createdByPersonId] === undefined) {
                    dispatch(actionCreators.getPerson(returnedPost.createdByPersonId));
                }
                dispatch({ type: addPostType, returnedPost });
            });     
    },

    setShowDialog: (showDialog) => async (dispatch, getState) => {
        dispatch({ type: setShowDialogType, showDialog });
    },

    getBoards: () => async (dispatch, getState) => {
        dispatch({ type: requestBoardsType });
        ChataloAPI.get(`api/board`)
            .then(res => {
                const boards = res.data;
                dispatch({ type: receiveBoardsType, boards });
            });
    },
    getPerson: (id) => async (dispatch, getState) => {
        dispatch({ type: requestPersonType, personId: id });
        ChataloAPI.get(`api/person/${id}`)
            .then(res => {
                const person = res.data;
                dispatch({ type: receivePersonType, person });
            });
    },
    getDiscussion: (id) => async (dispatch, getState) => {

            dispatch({ type: requestDiscussionType, discussionId: id });
            ChataloAPI.get(`api/discussion/${id}`)
                .then(res => {
                    const discussion = res.data;
                    const personsByHash = getState().forums.persons.byHash;
                    if (personsByHash[discussion.createdByPersonId] === undefined) {
                        dispatch(actionCreators.getPerson(discussion.createdByPersonId));
                    }
                    dispatch({ type: receiveDiscussionType, discussion });
                });
    },
    getCategoriesForBoard: (boardId) => async (dispatch, getState) => {
        dispatch({ type: requestCategoriesForBoardType, boardId: boardId });
        ChataloAPI.get(`api/board/${boardId}/categories`)
            .then(res => {
                const categories = res.data;
                dispatch({ type: receiveCategoriesForBoardType, boardId: boardId, categories: categories });
            });
    },
    getPostsForDiscussion: (discussionId) => async (dispatch, getState) => {
        dispatch({ type: requestPostsForDiscussionType, discussionId: discussionId });
        ChataloAPI.get(`api/discussion/${discussionId}/posts`)
            .then(
                response => {
                    const posts = response.data;
                    const personsByHash = getState().forums.persons.byHash;
                    let idsToAdd = posts.filter(p => personsByHash[p.createdByPersonId] === undefined).map(p => p.createdByPersonId);
                    idsToAdd.forEach(id => dispatch(actionCreators.getPerson(id)));
                    dispatch({ type: receivePostsForDiscussionType, discussionId: discussionId, posts: posts });
                },
                error => {
                    
                }
            );
    },
    getDiscussionsForCategory: (categoryId, offset, limit) => async (dispatch, getState) => {
        dispatch({ type: requestDiscussionsForCategoryType, categoryId: categoryId });
        ChataloAPI.get(`api/category/${categoryId}/discussions`)
            .then(res => {
                const discussions = res.data;
                const personsByHash = getState().forums.persons.byHash;
                let idsToAdd = discussions.filter(d => personsByHash[d.createdByPersonId] === undefined).map(d => d.createdByPersonId);
                idsToAdd.forEach(id => dispatch(actionCreators.getPerson(id)));
                dispatch({ type: receiveDiscussonsForCategoryType, categoryId: categoryId, discussions: discussions });
            });
    }
};

 
export const reducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {

        case requestBoardsType:
            return {
                ...state,
                numLoading: state.numLoading++
            };

        case receiveBoardsType:
            return {
                ...state,
                boards: { byId: action.boards.map(b => b.boardId), byHash: arrayToMap(action.boards, 'boardId') },
                numLoading: state.numLoading--
            };

        case requestCategoriesForBoardType:
            return {
                ...state,
                numLoading: state.numLoading++
            };

        case receiveCategoriesForBoardType:
            return {
                ...state,
                boards: updateHash(state.boards, action.boardId, { ...state.boards.byHash[action.boardId], categories: action.categories.map(c => c.boardCategoryId)}),
                categories: {
                    ...state.categories,
                    byHash: { ...state.categories.byHash, ...arrayToMap(action.categories, 'boardCategoryId') }
                },
                numLoading: state.numLoading--
            };

        case requestDiscussionsForCategoryType:
            return {
                ...state,
                numLoading: state.numLoading++
            };

        case receiveDiscussonsForCategoryType:
            return {
                ...state,
                categories: updateHash(state.categories, action.categoryId, { ...state.categories.byHash[action.categoryId], discussions: action.discussions.map(d => d.discussionId) }),
                discussions: {
                    ...state.discussions, byHash: { ...state.discussions.byHash, ...arrayToMap(action.discussions, 'discussionId') }
                },
                numLoading: state.numLoading--
            };

        case requestPostsForDiscussionType:
            return {
                ...state,
                numLoading: state.numLoading++
            };

        case receivePostsForDiscussionType:
            return {
                ...state,
                discussions: updateHash(state.discussions, action.discussionId, { ...state.discussions.byHash[action.discussionId], posts: action.posts.map(p => p.postId) }),
                posts: {
                    ...state.posts, byHash: { ...state.posts.byHash, ...arrayToMap(action.posts, 'postId') }
                },
                numLoading: state.numLoading--
            };

        case addDiscussionType:
            return {
                ...state,
                categories: updateHash(
                    state.categories,
                    action.returnedDiscussion.boardCategoryId,
                    {
                        ...state.categories.byHash[action.returnedDiscussion.boardCategoryId],
                        discussions: state.categories.byHash[action.returnedDiscussion.boardCategoryId].discussions.concat(action.returnedDiscussion.discussionId)
                    }),
                discussions: {
                    ...state.discussions,
                    byHash: { ...state.discussions.byHash, ...itemToMap(action.returnedDiscussion, 'discussionId') }
                },
                numLoading: state.numLoading--,
                showDialog: false
            };

        case addCategoryType:
            return {
                ...state,
                boards: updateHash(
                    state.boards,
                    action.returnedCategory.boardId,
                    {
                        ...state.boards.byHash[action.returnedCategory.boardId],
                        categories: state.boards.byHash[action.returnedCategory.boardId].categories.concat(action.returnedCategory.boardCategoryId)
                    }),
                categories: {
                    ...state.categories,
                    byHash: { ...state.categories.byHash, ...itemToMap(action.returnedCategory, 'boardCategoryId') }
                },
                numLoading: state.numLoading--,
                showDialog: false
            };

        case addBoardType:
            return {
                ...state,
                boards: {
                    ...state.boards,
                    byId: state.boards.byId.concat(action.returnedBoard.boardId),
                    byHash: {
                        ...state.boards.byHash,
                        ...itemToMap(action.returnedBoard, 'boardId')
                    }
                },
                numLoading: state.numLoading--,
                showDialog: false
            };

        case addPostType:
            return {
                ...state,
                discussions: updateHash(state.discussions, action.returnedPost.discussionId, { ...state.discussions.byHash[action.returnedPost.discussionId], posts: state.discussions.byHash[action.returnedPost.discussionId].posts.concat(action.returnedPost.postId) }),
                posts: { ...state.posts, byHash: { ...state.posts.byHash, ...itemToMap(action.returnedPost, 'postId') } },
                numLoading: state.numLoading--,
                showDialog: false
            };

        case requestDiscussionType:
            return {
                ...state,
                numLoading: state.numLoading++
            };

        case receiveDiscussionType:
            return {
                ...state,
                discussions: updateHash(state.discussions, action.discussion.discussionId, { ...state.discussions.byHash[action.discussion.discussionId], ...action.discussion }),
                numLoading: state.numLoading--
            };

        case requestPersonType:
            return state;

        case receivePersonType:
            return {
                ...state,
                persons: updateHash(state.persons, action.person.personId, { ...state.persons.byHash[action.person.personId], ...action.person })
            };

        case updateErrorDataType:
            return {
                ...state,
                errorData: action.errorData
            };

        case setShowDialogType:
            return {
                ...state,
                errorData: null,
                showDialog: action.showDialog
            };
        default:
            return state;
    }
};
