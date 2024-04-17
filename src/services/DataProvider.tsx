import {DataProvider, fetchUtils} from 'react-admin'

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
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
        });
        // console.log("Params: ", params)
        console.log("Data:", json)
        return { data: json };
    },

    // @ts-ignore
    create: async (resource: any, params: any) => {
        console.log(params)
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
        console.log("params edit: ", params)
        const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            credentials: 'include'
        })
        console.log("Data Edit: ", json)
        return Promise.resolve({data: json});
    },
    delete: async (resource: any, params: any) => {
        const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
        });
        // console.log("Params: ", params)
        console.log("Data delete:", json)
        return { data: json };
    },
}
