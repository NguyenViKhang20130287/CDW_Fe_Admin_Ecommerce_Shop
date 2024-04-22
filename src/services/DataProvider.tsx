import {DataProvider, fetchUtils} from 'react-admin'
import {cloneFile} from "./config";

const apiUrl = 'http://localhost:8080/api/v1'
const httpClient = fetchUtils.fetchJson

export const dataProvider: DataProvider = {

// @ts-ignore
    getList: async (resource: any, params: any) => {
        try {
            const {page, perPage} = params.pagination;
            const {field, order} = params.sort;
            const query = {
                filter: JSON.stringify(fetchUtils.flattenObject(params.filter)),
                sort: field,
                order: order,
                page: page - 1,
                perPage: perPage,
            };

            const {json} = await httpClient(`${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                // credentials: 'include',
            })
            console.log("Json: ", json)
            console.log("Content: ", json.content)
            return {
                data: json.content,
                total: parseInt(json.totalElements, 10),
            }

        } catch (err: any) {
        }
    },

    getOne: async (resource: any, params: any) => {
        const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
        });
        console.log("Params: ", params)
        console.log("Data:", json)
        return {data: json};
    },

    getManyReference: async (resource: any, params: any) => {
        const {page, perPage} = params.pagination;
        const {field, order} = params.sort;
        const query = {
            filter: JSON.stringify({
                ...fetchUtils.flattenObject(params.filter),
                [params.target]: params.id,
            }),
            sort: field,
            order: order,
            page: page - 1,
            perPage: perPage,
        };
        console.log(resource, params)
        const {json} = await httpClient(`${apiUrl}/${resource}/category/${params.id}?${fetchUtils.queryParameters(query)}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
        });
        console.log(json)
        return {
            data: json.content,
            total: parseInt(json.totalElements, 10),
        };
    },

    // @ts-ignore
    create: async (resource: any, params: any) => {
        console.log("param create ", params)

        if (resource === 'user') {
            const formData = new FormData();
            if (params.data.avatar && params.data.avatar.src && params.data.avatar.src.rawFile) {
                console.log('ok')
                const avt = cloneFile(params.data.avatar.src.rawFile, params.data.avatar.src.rawFile.name);
                formData.append('avatar', avt);
                console.log("Check file: ", avt instanceof File)
                console.log('Avatar: ', avt)
            }
            formData.append('username', params.data.username || '');
            formData.append('email', params.data.email || '');
            formData.append('fullName', params.data.fullName || '');
            formData.append('address', params.data.address || '');
            formData.append('phone', params.data.phone || '');
            formData.append('permission', params.data.permission || '');

            console.log('Form Data: ', formData);

            if (formData.entries().next().done) {
                console.error('FormData is empty');
                return Promise.reject('FormData is empty');
            }

            const {json} = await httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            window.location.href = `/#/${resource}`;
            return Promise.resolve({data: json});
        }

        // try {
        const {json} = await httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),

            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            // credentials: 'include'
        })
        // switch to window /#/resource
        window.location.href = `/#/${resource}`
        return Promise.resolve({data: json});
        // }
    }
    // catch (error: any) {
    //     if (error.status === 401) {
    //         // @ts-ignore
    //         authProvider.logout().then(r => console.log(r));
    //         window.location.href = '/#/login';
    //     }
    // }
    // }
    ,
    update: async (resource: any, params: any) => {
        let category = null;

        if (resource === 'user') {
            console.log('Params user: ', params)
            const formData = new FormData();
            if (typeof params.data.avatar.src !== 'undefined') {
                const avt = cloneFile(params.data.avatar.src.rawFile,
                    params.data.avatar.src.rawFile.name);
                formData.append('avatar', avt);
                console.log("Check file: ", avt instanceof File)
                console.log('Avatar: ', avt)
            }
            formData.append('username', params.data.username || '');
            formData.append('email', params.data.userInformation.email || '');
            formData.append('fullName', params.data.userInformation.fullName || '');
            formData.append('address', params.data.userInformation.address || '');
            formData.append('phone', params.data.userInformation.phone || '');
            formData.append('permission', params.data.permission.id || '');
            formData.append('status', params.data.status || '');

            console.log('Form Data: ', formData);

            if (formData.entries().next().done) {
                console.error('FormData is empty');
                return Promise.reject('FormData is empty');
            }

            const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PUT',
                body: formData,
                credentials: 'include'
            });

            window.location.href = `/#/${resource}`;
            return Promise.resolve({data: json});
        }

        if (resource === 'product') {
            const {json} = await httpClient(`${apiUrl}/category/${params.data.category.id}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                credentials: 'include'
            })
            category = json;
        }
        console.log(params)
        const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: category ? JSON.stringify({...params.data, category}) : JSON.stringify(params.data),
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            credentials: 'include'
        })
        return Promise.resolve({data: json});
    },

    delete: async (resource: any, params: any) => {
        const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
        });
        // console.log("Params: ", params)
        console.log("Data delete:", json)
        return {data: json};
    },
}
