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
                // start: (page - 1) * perPage ,
                // end: page * perPage
            };
            const {json} = await httpClient(`${apiUrl}/${resource}/find-all?${fetchUtils.queryParameters(query)}`, {
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
                total: json.totalElements,
            }

        } catch (err: any) {
        }
    },
}
