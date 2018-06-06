import axios from 'axios';

export function updateTokenData(data) {
    window.localStorage.setItem('token', data.auth_token);
    window.localStorage.setItem('id', data.id);
    window.localStorage.setItem('refreshToken', data.refresh_token);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.auth_token;
}

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = window.localStorage.getItem('refreshToken');
        const id = window.localStorage.getItem('id');
        if (refreshToken !== undefined && id !== undefined) {
            return axios.post('https://localhost:44328/auth/refresh', { id, refreshToken })
                .then(({ data }) => {
                    window.localStorage.setItem('token', data.auth_token);
                    window.localStorage.setItem('refreshToken', data.refresh_token);
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.auth_token;
                    originalRequest.headers['Authorization'] = 'Bearer ' + data.auth_token;
                    return axios(originalRequest);
                });
        }
    }

    return Promise.reject(error);
});

export default axios.create({
   // baseURL: 'https://localhost:44328/'
});