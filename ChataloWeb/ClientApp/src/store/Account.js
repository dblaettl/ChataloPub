import ChataloAPI, { updateTokenData } from './ChataloAPI';
const requestLoginType = 'REQUEST_LOGIN';
const receiveLoginType = 'RECEIVE_LOGIN';
const requestUserType = 'REQUEST_USER';
const receiveUserType = 'RECEIVE_USER';
const requestRegistrationType = 'REQUEST_REGISTRATION';
const receiveRegistrationType = 'RECEIVE_REGISTRATION';
const logoutType = 'LOGOUT';

const initialState = { user: null, token: null, isLoggedIn: false, isLoading: false };

export const actionCreators = {
    login: (email, password) => async (dispatch, getState) => {
        dispatch({ type: requestLoginType });
        ChataloAPI.post(`api/auth/login`, { email, password })
            .then(res => {
                const token = res.data;
                updateTokenData(token);
                dispatch({ type: receiveLoginType });
                dispatch({ type: requestUserType });
                ChataloAPI.get(`api/accounts/user`)
                    .then(res => {
                        const user = res.data;
                        dispatch({ type: receiveUserType, user });
                    });
            });
    },
    register: (user) => async (dispatch, getState) => {
        dispatch({ type: requestRegistrationType });
        ChataloAPI.post(`api/accounts`, user)
            .then(res => {
                const token = res.data;
                updateTokenData(token);
                dispatch({ type: receiveRegistrationType });
                dispatch({ type: requestUserType });
                ChataloAPI.get(`api/accounts/user`)
                    .then(res => {
                        const createdUser = res.data;
                        dispatch({ type: receiveUserType, user: createdUser });
                    });
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
        case receiveUserType:
            return {
                ...state,
                user: action.user,
                isLoading: false
            };
        default:
            return state;
    }
};
