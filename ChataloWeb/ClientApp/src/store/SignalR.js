import { userJoinedType, userLeftType, receiveChatMessageType, personsOnlineType } from './Chat';
import * as SignalR from '@aspnet/signalr';
import axios from 'axios';

var connection;


const internalConnect = (store) => {
    const token = window.localStorage.getItem('token');
    const tokenQuery = token ? "?token=" + token : "";
    if (connection && connection.connection && connection.connection.connectionState === 1) {
        connection.stop();
    }
    connection = new SignalR.HubConnectionBuilder()
        .withUrl("/hubs/chat" + tokenQuery)
        .configureLogging(SignalR.LogLevel.Information)
        .build();
    connection.on('ReceiveMessage', data => {
        store.dispatch({ type: receiveChatMessageType, message: data });
    });
    connection.on('UserJoined', data => {
        store.dispatch({ type: userJoinedType, person: data });
    });
    connection.on('CurrentUsers', data => {
        store.dispatch({ type: personsOnlineType, persons: data });
    });
    connection.on('UserLeft', data => {
        store.dispatch({ type: userLeftType, personId: data });
    });
};

export const signalRConnect = (store) => {
    internalConnect(store);
    connection.start().catch(err => {
        const refreshToken = window.localStorage.getItem('refreshToken');
        const id = window.localStorage.getItem('id');
        if (refreshToken && id) {
            return axios.post('/api/auth/refresh', { id, refreshToken })
                .then(({ data }) => {
                    window.localStorage.setItem('token', data.auth_token);
                    window.localStorage.setItem('refreshToken', data.refresh_token);
                    internalConnect(store);
                });
        }
    });
};

// Make the function wait until the connection is made...
function waitForSocketConnection(connection, callback) {
    setTimeout(
        function () {
            if (connection.connection.connectionState === 1) {
                console.log("Connection is made");
                if (callback !== null) {
                    callback();
                }
                return;

            } else {
                console.log("wait for connection...");
                waitForSocketConnection(connection, callback);
            }

        }, 5); // wait 5 milisecond for the connection...
}

export const signalRMiddleware = (store) => (next) => async (action) => {
        switch (action.type) {
            case "SIGNALR_SEND_MESSAGE":
                waitForSocketConnection(connection, function () {
                    connection.invoke("SendMessage", action.text);
                });     
                break;
            case "SIGNALR_USER_JOINED":
                waitForSocketConnection(connection, function () {
                    connection.invoke("EnteredChannel");
                });     
                break;
            case "SIGNALR_USER_LEFT":
                waitForSocketConnection(connection, function () {
                    connection.invoke("LeftChannel");
                });                   
                break;
            case "SIGNALR_CONNECT":
                signalRConnect(store);
                break;
            default:
                break;
        }
   // }
    return next(action);
};


