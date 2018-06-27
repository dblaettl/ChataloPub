import ChataloAPI, { updateTokenData, assureCurrentToken, removeTokenData } from './ChataloAPI';
const requestLoginType = 'REQUEST_LOGIN';
const receiveLoginType = 'RECEIVE_LOGIN';
const requestUserType = 'REQUEST_USER';
const receiveUserType = 'RECEIVE_USER';
const requestRegistrationType = 'REQUEST_REGISTRATION';
const receiveRegistrationType = 'RECEIVE_REGISTRATION';
const logoutType = 'LOGOUT';
const updateErrorDataType = 'UPDATE_ERROR_DATA_TYPE';

const initialState = { user: null, token: null, isLoggedIn: false, isLoading: false, errorData: null };

 
export const actionCreators = {
    attemptReLogin: () => async (dispatch, getState) => {
        const state = getState().account;
        if (!state.isLoggedIn && !state.isLoading) {
            const found = assureCurrentToken();
            if (found) {
                dispatch(actionCreators.getUser());
            }
        }
    }, 
    getUser: () => async (dispatch, getState) => {
        dispatch({ type: requestUserType });
        ChataloAPI.get(`api/accounts/user`)
            .then(res => {
                const user = res.data;
                dispatch({ type: receiveUserType, user });
            });
    },
    logout: () => async (dispatch, getState) => {
        removeTokenData();
        dispatch({ type: logoutType });
    },
    login: (email, password) => async (dispatch, getState) => {
        dispatch({ type: requestLoginType });
        ChataloAPI.post(`api/auth/login`, { email, password })
            .then(res => {
                const token = res.data;
                updateTokenData(token);
                dispatch({ type: receiveLoginType });
                dispatch(actionCreators.getUser());
                dispatch({ type: "SIGNALR_CONNECT" });
            });
    },
    register: (user) => async (dispatch, getState) => {
        dispatch({ type: requestRegistrationType });
        ChataloAPI.post(`api/accounts`, user)
            .then(res => {
                const token = res.data;
                updateTokenData(token);
                dispatch({ type: receiveRegistrationType });
                dispatch(actionCreators.getUser());
            });
    } 
};

 
export const reducer = (state, action) => {
    state = state || initialState;
    switch (action.type) {
        case requestLoginType:
            return {
                ...state,
                isLoggedIn: false,
                isLoading: true
            };
        case logoutType:
            return {
                ...state,
                user: null,
                isLoggedIn: false
            };
        case receiveLoginType:
            return {
                ...state,
                isLoggedIn: true,
                isLoading: false
            };
        case requestRegistrationType:
            return {
                ...state,
                isLoggedIn: false,
                isLoading: true
            };
        case receiveRegistrationType:
            return {
                ...state,
                isLoggedIn: true,
                isLoading: false
            };    
        case requestUserType:
            return {
                ...state,
                user: null,
                isLoading: true
            };
        case updateErrorDataType:
            return {
                ...state,
                errorData: action.errorData
            };
        case receiveUserType:
            return {
                ...state,
                user: action.user,
                isLoggedIn: true,
                isLoading: false
            };
        default:
            return state;
    }
};
