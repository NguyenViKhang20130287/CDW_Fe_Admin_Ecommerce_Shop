import {DataProvider, fetchUtils} from 'react-admin'

const apiUrl = 'http://localhost:8080/api/v1'
const httpClient = fetchUtils.fetchJson

export const dataProvider : DataProvider = {
    // @ts-ignore
    getList: async (resource: any, params: any) => {
        try {
            const {pageNum, pageSize} = params.pagination;
            const {field, order} = params.sort;
            const query = {
                filter: JSON.stringify(fetchUtils.flattenObject(params.filter)),
                sort: field,
                order: order,
                start: (pageNum - 1) * pageSize,
                end: pageNum * pageSize,
            };
            const {json} = await httpClient(`${apiUrl}/${resource}/find-all?${fetchUtils.queryParameters(query)}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                // credentials: 'include',
            })
            console.log("json: ", json)
            return {
                data: json,
                total: parseInt(json.totalElements, 5),
            }

        } catch (err: any) {
        }
    },
}

// export default dataProvider

