import ChataloAPI from './ChataloAPI';

export const receiveChatMessageType = "RECEIVE_CHAT_MESSAGE_TYPE";
export const userJoinedType = "USER_JOINED_TYPE";
export const userLeftType = "USER_LEFT_TYPE";

const initialState = {
    messages: [],
    persons: { byId: [], byHash: {} },
    numLoading: 0
};


export const actionCreators = {

    sendMessage: (message) => async (dispatch, getState) => {
        dispatch({ type: "SIGNALR_SEND_MESSAGE" });
    },
    joinChat: (message) => async (dispatch, getState) => {
        dispatch({ type: "SIGNALR_USER_JOINED" });
    },
    leaveChat: (message) => async (dispatch, getState) => {
        dispatch({ type: "SIGNALR_USER_LEFT" });
    }
};


export const reducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {

        case receiveChatMessageType:
            return {
                ...state,
                messages: state.messages.concat(action.message)
            };
        case userJoinedType:
            return {
                ...state,
                messages: state.messages.concat(action.message)
            };
        case userLeftType:
            return {
                ...state,
                messages: state.messages.concat(action.message)
            };
        default:
            return state;
    }
};
