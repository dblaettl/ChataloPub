import { userJoinedType, userLeftType, receiveChatMessageType } from './Chat';
import * as SignalR from '@aspnet/signalr';

var connection;

const signalRRegisterCommands = (store) => {

    connection.on('ReceiveMessage', data => {
        store.dispatch({ type: receiveChatMessageType, message: data });
    });
    connection.on('UserJoined', data => {
        store.dispatch({ type: userJoinedType, person: data });
    });
    connection.on('UserLeft', data => {
        store.dispatch({ type: userLeftType, personId: data });
    });
    connection.start().catch(err => console.error(err.toString()));
};

export const signalRConnect = (store) => {
    const token = window.localStorage.getItem('token');
    const tokenQuery = token ? "?token=" + token : "";
    connection = new SignalR.HubConnectionBuilder()
        .withUrl("/hubs/chat" + tokenQuery)
        .configureLogging(SignalR.LogLevel.Information)
        .build();
    signalRRegisterCommands(store);
};


export const signalRMiddleware = (store) => (next) => async (action) => {
    if (connection.connection.connectionState === 1) {
        switch (action.type) {
            case "SIGNALR_SEND_MESSAGE":
                connection.invoke("SendMessage", action.text);
                break;
            case "SIGNALR_USER_JOINED":
                connection.invoke("EnteredChannel");
                break;
            case "SIGNALR_USER_LEFT":
                connection.invoke("LeftChannel");
                break;
            case "SIGNALR_CONNECT":
                signalRConnect(store);
                break;
            default:
                break;
        }
    }
    return next(action);
};


