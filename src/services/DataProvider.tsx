import {DataProvider, fetchUtils} from 'react-admin'
import {cloneFile} from "./config";
import {imgProvider} from "../imgProvider/imageUrl";
import axios from "axios";

const apiUrl = 'http://localhost:8080/api/v1'
const httpClient = fetchUtils.fetchJson

export async function addLog(action: string) {
    const token: any = localStorage.getItem("auth")
    try {
        const res = await axios.post(apiUrl + "/log/", null,
            {
                params: {
                    token: token,
                    action: action
                }
            })
        console.log('Response log: ', res)
    } catch (e) {
        console.log('Err add log: ', e)
    }
}

async function getBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader: any = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            resolve(reader.result.split(',')[1])
        }
        reader.onerror = reject
    })
}

async function getImageUrl(file: any) {
    const formData = new FormData();
    formData.append('image', file);
    try {
        const response = await
            fetch('https://api.imgbb.com/1/upload?key=8c2c7c5c94797f04504f969ec51749a4',
                {
                    method: 'POST',
                    body: formData
                });

        const result = await response.json();
        if (result.success) {
            return JSON.stringify(result.data.url)
        } else {
            console.error("Error uploading image to ImgBB", result);
        }
    } catch (error) {
        console.error("Error uploading image to ImgBB", error);
    }
}

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
                credentials: 'include',
            })
            // console.log("Json: ", json)
            // console.log("Content: ", json.content)
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
    getMany: async (resource: any, params: any) => {
        const ids = params.ids.map((cate: object | any) => typeof cate === "object" ? cate.id : cate)
        const query = {
            ids: JSON.stringify({ids: ids}),
        };
        let result: never[] = [];
        await httpClient(`${apiUrl}/${resource}/ids?${fetchUtils.queryParameters(query)}`, {
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            credentials: 'include',
        }).then((response: any) => {
            result = Array.isArray(response.data) ? response.data : [response.data];
        })
        return Promise.resolve({data: result})
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
        const {json} = await httpClient(`${apiUrl}/${resource}/${params.target}/${params.id}?${fetchUtils.queryParameters(query)}`, {
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
        // try {
        try {
            if (resource === 'user') {
                const formData = new FormData();
                if (params.data.avatar && params.data.avatar.src && params.data.avatar.src.rawFile) {
                    const avt = cloneFile(params.data.avatar.src.rawFile, params.data.avatar.src.rawFile.name);
                    // @ts-ignore
                    formData.append('avatarLink', JSON.parse(await getImageUrl(avt)));
                    // console.log("Check file: ", avt instanceof File)
                    // console.log('Avatar: ', avt)
                }
                formData.append('username', params.data.username || '');
                formData.append('email', params.data.email || '');
                formData.append('fullName', params.data.fullName || '');
                formData.append('phone', params.data.phone || '');
                formData.append('permission', params.data.permission || '');

                console.log('Form Data: ', formData);

                if (formData.entries().next().done) {
                    console.error('FormData is empty');
                    return Promise.reject('FormData is empty');
                }
                // console.log('Params: ', params)
                const {json} = await httpClient(`${apiUrl}/${resource}`, {
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
                });
                await addLog(`Thêm nguời dùng mới có username: ${formData.get("username")}`)
                window.location.href = `/#/${resource}`;
                return Promise.resolve({data: json});
            }
        } catch (e) {
            console.log('err', e)
        }

        //
        let thumbnail = null;
        let imageProducts = [];
        if (resource === 'product') {
            if (params.data.thumbnail !== undefined && params.data.thumbnail !== null) {
                let selectedImg = null;
                await getBase64(params.data.thumbnail.rawFile)
                    .then(res => {
                        selectedImg = res;
                    })
                    .catch(err => console.log(err))
                thumbnail = await imgProvider(selectedImg);
            }
            if (params.data.imageProducts !== undefined && params.data.imageProducts !== null) {
                for (const item of params.data.imageProducts) {
                    let selectedImg = null;
                    await getBase64(item.rawFile)
                        .then(res => {
                            selectedImg = res;
                        })
                        .catch(err => console.log(err))
                    imageProducts.push({
                        product: null,
                        link: await imgProvider(selectedImg),
                    });
                }
            }
            params.data.colorSizes = await Promise.all(params.data.colorSizes.map(async (item: any) => {
                const {data: color} = await dataProvider.getOne('color', {id: item.color});
                const {data: size} = await dataProvider.getOne('size', {id: item.size});
                return {
                    ...item,
                    color,
                    size,
                };
            }));
            const {data: category} = await dataProvider.getOne('category', {id: params.data.category});
            params.data.category = category;
            // params.data.thumbnail = thumbnail;
            // params.data.imageProducts = imageProducts;
            params.data.createdBy = null;
            params.data.updatedBy = null;
            const {json} = await httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify({
                    ...params.data,
                    category: category,
                    thumbnail: thumbnail,
                    imageProducts: imageProducts
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                credentials: 'include'
            })

            window.location.href = `/#/${resource}`
            return Promise.resolve({data: json});
        }
        if (resource === "blog") {
            if (params.data.thumbnail !== undefined && params.data.thumbnail !== null) {
                let selectedImg = null;
                await getBase64(params.data.thumbnail.rawFile)
                    .then(res => {
                        selectedImg = res;
                    })
                    .catch(err => console.log(err))
                thumbnail = await imgProvider(selectedImg);
            }
            const {json} = await httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify({...params.data, thumbnail: thumbnail}),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                credentials: 'include'
            })

            window.location.href = `/#/${resource}`
            return Promise.resolve({data: json});
        }
        if(resource === "slider"){
            if (params.data.link !== undefined && params.data.link !== null) {
                let selectedImg = null;
                await getBase64(params.data.link.rawFile)
                    .then(res => {
                        selectedImg = res;
                    })
                    .catch(err => console.log(err))
                thumbnail = await imgProvider(selectedImg);
            }
            const {json} = await httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify({...params.data, link: thumbnail}),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                credentials: 'include'
            })

            window.location.href = `/#/${resource}`
            return Promise.resolve({data: json});
        }
        else {
            const {json} = await httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify(resource === "warehouse" ? params.data.ImportInvoiceRequest : params.data),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                credentials: 'include'
            })
            // switch to window /#/resource
            window.location.href = `/#/${resource}`
            return Promise.resolve({data: json});
        }

    }
    //     catch(error: any) {
    //         if (error.status === 401) {
    //             // @ts-ignore
    //             authProvider.logout().then(r => console.log(r));
    //             window.location.href = '/#/login';
    //         }
    //     }
    // }
    ,
    update: async (resource: any, params: any) => {
        let thumbnail = null;
        let imageProducts = [];
        console.log(" updated params: ", params)
        let category = null;
        let colorSizes = null;
        //
        if (resource === 'user') {
            console.log('Params user: ', params)
            const formData = new FormData();
            if (typeof params.data.avatar.src !== 'undefined') {
                const avt = cloneFile(params.data.avatar.src.rawFile,
                    params.data.avatar.src.rawFile.name);
                // @ts-ignore
                console.log('Avatar: ', JSON.parse(await getImageUrl(avt)))

                // @ts-ignore
                formData.append('avatarLink', JSON.parse(await getImageUrl(avt)));
            }
            formData.append('username', params.data.username || '');
            formData.append('email', params.data.userInformation.email || '');
            formData.append('fullName', params.data.userInformation.fullName || '');
            formData.append('address', params.data.userInformation.address || '');
            formData.append('phone', params.data.userInformation.phone || '');
            formData.append('permission', params.data.permission.id || '');
            formData.append('status', params.data.status.toString() || '');

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

            await addLog(`Sửa thông tin người dùng có username ${params.data.id}`)
            window.location.href = `/#/${resource}`;
            return Promise.resolve({data: json});
        }

        if (resource === 'product') {
            if (params.data.thumbnail_new !== undefined && params.data.thumbnail_new !== null) {
                let selectedImg = null;
                await getBase64(params.data.thumbnail_new.rawFile)
                    .then(res => {
                        selectedImg = res;
                    })
                    .catch(err => console.log(err))
                thumbnail = await imgProvider(selectedImg);
            }
            if (params.data.imageProducts_new !== undefined && params.data.imageProducts_new !== null) {
                for (const item of params.data.imageProducts_new) {
                    let selectedImg = null;
                    await getBase64(item.rawFile)
                        .then(res => {
                            selectedImg = res;
                        })
                        .catch(err => console.log(err))
                    imageProducts.push({
                        product: null,
                        link: await imgProvider(selectedImg),
                    });
                }
            }
            const {json: categoryJson} = await httpClient(`${apiUrl}/category/${params.data.category.id}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                credentials: 'include'
            });
            category = categoryJson;
            colorSizes = await Promise.all(params.data.colorSizes.map(async (item: any) => {
                const {data: color} = await dataProvider.getOne('color', {id: item.color.id});
                const {data: size} = await dataProvider.getOne('size', {id: item.size.id});
                return {
                    ...item,
                    color,
                    size,
                };
            }));

            const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...params.data,
                    category,
                    colorSizes,
                    thumbnail: thumbnail !== null ? thumbnail : params.data.thumbnail,
                    imageProducts: imageProducts.length > 0 ? imageProducts : params.data.imageProducts
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                credentials: 'include'
            });
            window.location.href = `/#/${resource}`;
            return Promise.resolve({data: json});
        }
        if (resource === 'blog') {
            if (params.data.thumbnail_new !== undefined && params.data.thumbnail_new !== null) {
                let selectedImg = null;
                await getBase64(params.data.thumbnail_new.rawFile)
                    .then(res => {
                        selectedImg = res;
                    })
                    .catch(err => console.log(err))
                thumbnail = await imgProvider(selectedImg);
            }
            const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...params.data,
                    thumbnail: thumbnail !== null ? thumbnail : params.data.thumbnail
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                credentials: 'include'
            })
            window.location.href = `/#/${resource}`;
            return Promise.resolve({data: json});
        }
        if (resource === 'slider') {
            if (params.data.link_new !== undefined && params.data.link_new !== null) {
                let selectedImg = null;
                await getBase64(params.data.link_new.rawFile)
                    .then(res => {
                        selectedImg = res;
                    })
                    .catch(err => console.log(err))
                thumbnail = await imgProvider(selectedImg);
            }
            const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...params.data,
                    link: thumbnail !== null ? thumbnail : params.data.link
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                credentials: 'include'
            })
            window.location.href = `/#/${resource}`;
            return Promise.resolve({data: json});
        }
        //
        console.log(" updated params: ", params)
        const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: category ? JSON.stringify({...params.data, category, colorSizes}) : JSON.stringify(params.data),
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            credentials: 'include'
        })
        // switch (resource){
        //     case 'order':
        //         await addLog(`Sửa thông tin đơn hàng có id ${params.data.id}`)
        //         break
        // }
        return Promise.resolve({data: json});
    },
    updateMany:
        (resource: any, params: any) => Promise.resolve({data: []}),

    delete:
        async (resource: any, params: any) => {
            const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
            });
            switch (resource){
                case 'user':
                    await addLog(`Xóa thông tin người dùng có id: ${params.id}`)
                    break
                case 'order':
                    await addLog(`Xóa thông tin đơn hàng có id: ${params.id}`)
                    break
            }
            // console.log("Params: ", params)
            console.log("Data delete:", json)
            return {data: json};
        },
}
