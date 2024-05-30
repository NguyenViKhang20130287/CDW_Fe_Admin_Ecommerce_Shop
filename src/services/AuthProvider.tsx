import React from "react";
import {
    AuthProvider,
    fetchUtils,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_ERROR,
    AUTH_CHECK
}
    from 'react-admin'
// import simpleRestProvider from 'ra-data-simple-rest'
import axios from "axios";
import {json} from "node:stream/consumers";

const httpClient = async (url: string, options: any = {}): Promise<any> => {
    const headers = {
        'Accept': 'application/json',
    };

    const authData = localStorage.getItem('auth');
    if (authData) {
        const {token} = JSON.parse(authData);
        // @ts-ignore
        headers['Authorization'] = `Bearer ${token}`;
    }

    return axios({
        method: options.method || 'GET',
        url: url,
        headers: headers,
        data: options.body,
    }).then((response: { data: any; }) => response.data);
};

// const dataProvider = simpleRestProvider('http://localhost:3000', httpClient)


export const authProvider: AuthProvider = {
    checkAuth: () => {
        // return localStorage.getItem('token') ? Promise.resolve() : Promise.reject({redirectTo: '/login'});
        const authData = localStorage.getItem('auth');
        // @ts-ignore
        const {token} = authData ? JSON.parse(authData) : {};
        return token ? Promise.resolve() : Promise.reject({redirectTo: '/login'});
    },
    checkError: (error: any) => {
        const status = error.response ? error.response.status : null;
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            return Promise.reject({redirectTo: '/login'});
        }
        return Promise.resolve();
    },
    getPermissions(params: any): Promise<any> {
        return Promise.resolve(undefined);
    },
    login: ({username, password}: { username: string, password: string }) => {
        return axios.post('http://localhost:8080/api/v1/auth/login', {username, password})
            .then(response => {
                const res = response.data.body
                const token = res.token
                const permission = res.permission
                // console.log('Token: ', res.token)
                // console.log('Permission: ', res.permission)
                if (!token) {
                    throw new Error('Token not found in response')
                }
                if (permission === 'ADMIN') {
                    localStorage.setItem('auth', JSON.stringify({token}))
                } else throw new Error('The account is not authorized to log in.')
            })
            .catch(err => {
                throw new Error('Network error')
            })
    },
    logout(params: any): Promise<void | false | string> {
        localStorage.removeItem('auth');
        return Promise.resolve();
    }
}
