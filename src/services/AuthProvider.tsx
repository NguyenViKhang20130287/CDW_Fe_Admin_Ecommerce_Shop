import React from "react";
import {
    AuthProvider,
    fetchUtils,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_ERROR,
    AUTH_CHECK, useNotify
}
    from 'react-admin'
// import simpleRestProvider from 'ra-data-simple-rest'
import axios from "axios";


export const authProvider: AuthProvider = {
    checkAuth: async () => {
        // return localStorage.getItem('token') ? Promise.resolve() : Promise.reject({redirectTo: '/login'});
        const token = localStorage.getItem('auth');
        // console.log('Token check: ', token)
        if (token) {
            try {
                const res = await axios.post("https://teelab-be.up.railway.app/api/v1/auth/check-expired", null,
                    {
                        params: {
                            token: token
                        }
                    })
                // console.log('Response check token is expired: ', res)
                if (res.data.statusCodeValue === 200) {
                    // notify('Đăng nhập thành công', { type: 'info' })
                    return Promise.resolve()
                } else {
                    // notify("Phiên đăng nhập đã hết hạn !", { type: 'warning' })
                    return Promise.reject({redirectTo: '/login'});
                }
            } catch (e) {
                // console.log('Err check auth: ', e)
                return Promise.reject({redirectTo: '/login'});
            }
        } else {
            return Promise.reject({redirectTo: '/login'});
        }

        // return token ? Promise.resolve() : Promise.reject({redirectTo: '/login'});
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
        const permission = localStorage.getItem('permission')
        return Promise.resolve(permission);
    },
    login: async ({username, password}: { username: string, password: string }) => {
        try {
            const response = await axios.post('https://teelab-be.up.railway.app/api/v1/auth/login', {
                username,
                password
            });
            const res = response.data.body;
            console.log('Response login: ', response)
            const token = res.token;
            console.log('Token login: ', token)
            const permission = res.permission;
            console.log('Permission login: ', permission)
            if (!token) {
                throw new Error('Phiên đăng nhập đã hết hạn !');
            }
            if (permission === 'ADMIN' || permission === 'PRODUCT_MANAGER' || permission === 'ORDER_MANAGER' || permission === 'PROMOTION_MANAGER') {
                localStorage.setItem('auth', token);
                localStorage.setItem("permission", permission)
            } else
                throw new Error('Tài khoản không có quyền hạng để đăng nhập vào hệ thống !.');
        } catch (err) {
            throw new Error('Username hoặc mật khẩu không đúng !');
        }
    },
    logout(params: any): Promise<void | false | string> {
        localStorage.removeItem('auth');
        localStorage.removeItem("permission")
        return Promise.resolve();
    },
    getIdentity: async () => {
        try {
            const token = localStorage.getItem('auth')
            const res = await axios.get("https://teelab-be.up.railway.app/api/v1/user/user-details", {
                params: {
                    token: token
                }
            })
            console.log('Response identity: ', res)
            let {id, fullName, avatar} = res.data;
            fullName = res.data.userInformation.fullName
            avatar = res.data.userInformation.avatar
            console.log('Data: ', {id, fullName, avatar})
            return Promise.resolve({id, fullName, avatar});
        } catch (error) {
            return Promise.reject(error);
        }
    },

}
