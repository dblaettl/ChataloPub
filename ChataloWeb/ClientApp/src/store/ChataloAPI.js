﻿import axios from 'axios';
import { configuredStore } from './configureStore';

export function updateTokenData(data) {
    window.localStorage.setItem('token', data.auth_token);
    window.localStorage.setItem('id', data.id);
    window.localStorage.setItem('refreshToken', data.refresh_token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.auth_token;
}

export function assureCurrentToken() {
    const token = window.localStorage.getItem('token');
    if (token !== undefined) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        return true;
    } else {
        return false;
    }
}

const instance = axios.create({
    baseURL: 'https://localhost:44328/',
    timeout: 10000,
    params: {}
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = window.localStorage.getItem('refreshToken');
        const id = window.localStorage.getItem('id');
        if (refreshToken !== undefined && id !== undefined) {
            return axios.post('https://localhost:44328/api/auth/refresh', { id, refreshToken })
                .then(({ data }) => {
                    window.localStorage.setItem('token', data.auth_token);
                    window.localStorage.setItem('refreshToken', data.refresh_token);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.auth_token;
                    originalRequest.headers['Authorization'] = 'Bearer ' + data.auth_token;
                    return axios(originalRequest);
                });
        }
    } else if (error.response.status === 400) {
        // bad request data will attempt to go back to the form
        configuredStore.dispatch({ type: 'UPDATE_ERROR_DATA', errorData: error.response.data });
    } else {
        // otherwise we'll put the error in the global page and log to console
    }

    return Promise.reject(error);
});

export default instance;