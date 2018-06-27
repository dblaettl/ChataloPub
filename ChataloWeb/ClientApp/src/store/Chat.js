import ChataloAPI from './ChataloAPI';
import { arrayToMap, undefinedIds } from './storeHelpers';
export const receiveMessagesType = "RECEIVE_MESSAGES_TYPE";
export const receiveChatMessageType = "RECEIVE_CHAT_MESSAGE_TYPE";
export const userJoinedType = "USER_JOINED_TYPE";
export const userLeftType = "USER_LEFT_TYPE";
export const personsOnlineType = "PERSONS_ONLINE_TYPE";

const initialState = {
    messages: [],
    persons: { byId: [], byHash: {} },
    numLoading: 0
};


export const actionCreators = {

    sendMessage: (text) => async (dispatch, getState) => {
        dispatch({ type: "SIGNALR_SEND_MESSAGE", text: text });
    },
    getMessages: () => async (dispatch, getState) => {
        ChataloAPI.get(`api/message`)
            .then(res => {
                const messages = res.data;
                dispatch({ type: receiveMessagesType, messages });
            });
    },
    joinChat: () => async (dispatch, getState) => {
        dispatch({ type: "SIGNALR_USER_JOINED" });
    },
    leaveChat: () => async (dispatch, getState) => {
        dispatch({ type: "SIGNALR_USER_LEFT" });
    }
};


export const reducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case receiveMessagesType:
            return {
                ...state,
                messages: action.messages
            };
        case receiveChatMessageType:
            return {
                ...state,
                messages: state.messages.concat(action.message)
            };
        case userJoinedType:
            var newJoinedids = undefinedIds([action.person.personId], state.persons.byHash);
            return {
                ...state,
                persons: {
                    byId: [...state.persons.byId, ...newJoinedids],
                    byHash: { ...state.persons.byHash, [action.person.personId]: action.person }
                }
            };
        case personsOnlineType:
            var newPersonids = undefinedIds(action.persons.map(p => p.personId), state.persons.byHash);
            return {
                ...state,
                persons: { byId: [...state.persons.byId, ...newPersonids], byHash: arrayToMap(action.persons, 'personId') }
            };
        case userLeftType:
            const prunedIds = state.persons.byId.filter(item => { return item !== action.personId; });
            delete state.persons.byHash[action.personId];
            return {
                ...state,
                persons: {
                    byId: prunedIds,
                    byHash: state.persons.byHash
                }
            };
        default:
            return state;
    }
};
