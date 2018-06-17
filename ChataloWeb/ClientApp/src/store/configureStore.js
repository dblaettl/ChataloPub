import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import * as Persons from './Persons';
import * as Forums from './Forums';
import * as Account from './Account';

export var configuredStore;

export default function configureStore(history, initialState) {
    const reducers = combineReducers({
        persons: Persons.reducer,
        forums: Forums.reducer,
        account: Account.reducer
    });

    const middleware = [
        thunk,
        routerMiddleware(history)
    ];

    // In development, use the browser's Redux dev tools extension if installed
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
        enhancers.push(window.devToolsExtension());
    }

    configuredStore = createStore(
        connectRouter(history)(reducers),
        initialState,
        compose(applyMiddleware(...middleware), ...enhancers)
    );
    return configuredStore;
}
