import {DataProvider, fetchUtils, HttpError, useNotify, useRedirect} from 'react-admin'
import {cloneFile} from "./config";
import {imgProvider} from "../imgProvider/imageUrl";
import axios from "axios";
import {useEffect} from "react";
import {rejects} from "node:assert";

const apiUrl = 'https://teelab-be.up.railway.app/api/v1'
const httpClient = fetchUtils.fetchJson

// const permission = localStorage.getItem("permission")

export async function addLog(action: string) {
    try {
        const token: any = localStorage.getItem("auth")
        const res = await axios.post(apiUrl + "/log/", null,
            {
                params: {
                    token: token,
                    action: action
                }
            })
        console.log('Response log: ', res)
        return res.data
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

//get user by token
export async function getUserByToken() {
    const token: any = localStorage.getItem("auth")
    try {
        const res = await axios.get(apiUrl + "/user/user-details", {
            params: {
                token: token
            }
        })
        return res.data
    } catch (e) {
        console.log('Err get user by token: ', e)
    }
}

export const dataProvider: DataProvider = {

    // @ts-ignore
    getList: async (resource: any, params: any) => {
        try {
            const {page, perPage} = params.pagination;
            const {field, order} = params.sort;
            const query = {
                filter: JSON.stringify({
                    ...fetchUtils.flattenObject(params.filter),
                    isDeleted: false
                }),
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
            result = Array.isArray(response.json) ? response.json : response.json;
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
        const user = await getUserByToken();
        const token: any = localStorage.getItem("auth")
        console.log("user", user)
        let avatarLink
        try {
            if (resource === 'user') {
                if (params.data.avatar && params.data.avatar.src && params.data.avatar.src.rawFile) {
                    const avt = cloneFile(params.data.avatar.src.rawFile, params.data.avatar.src.rawFile.name);
                    // @ts-ignore
                    avatarLink = JSON.parse(await getImageUrl(avt))
                }

                const bodyParams: any = {
                    username: params.data.username,
                    email: params.data.email,
                    fullName: params.data.fullName,
                    phone: params.data.phone,
                    permission: params.data.permission,
                    avatarLink: avatarLink
                }
                console.log('Params body: ', bodyParams)
                // console.log('Params: ', params)
                const {json} = await httpClient(`${apiUrl}/${resource}`, {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    }),
                    body: JSON.stringify(bodyParams),
                    credentials: 'include'
                });
                await addLog(`Thêm nguời dùng mới có username: ${bodyParams.username}`)
                window.location.href = `/#/${resource}`;
                return Promise.resolve({data: json});
            }
            if (resource === 'discount-code') {
                const param = {...params.data, token: localStorage.getItem("auth")}
                // console.log('Params create discount: ', param.token)
                const {json} = await httpClient(`${apiUrl}/${resource}`, {
                    method: 'POST',
                    body: JSON.stringify(param),
                    credentials: 'include'
                });
                console.log('Res: ', json)
                window.location.href = `/#/${resource}`;
                return Promise.resolve({data: json});
            }
        } catch (e) {
            console.log('err', e)
            return Promise.reject(new Error('Không đủ quyền hạng để thực hiện'));
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
                    color: color,
                    size: size,
                };
            }));
            const {data: category} = await dataProvider.getOne('category', {id: params.data.category});
            params.data.category = category;
            params.data.createdBy = user;
            params.data.updatedBy = user;

            console.log('Params create product: ', params)
            const {json} = await httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify({
                    ...params.data,
                    category: category,
                    thumbnail: thumbnail,
                    imageProducts: imageProducts,
                    createdBy: user,
                    updatedBy: user
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
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
            params.data.createdBy = user;
            params.data.updatedBy = user;
            const {json} = await httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify({...params.data, thumbnail: thumbnail, createdBy: user, updatedBy: user}),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }),
                credentials: 'include'
            })

            window.location.href = `/#/${resource}`
            return Promise.resolve({data: json});
        }
        if (resource === "slider") {
            if (params.data.link !== undefined && params.data.link !== null) {
                let selectedImg = null;
                await getBase64(params.data.link.rawFile)
                    .then(res => {
                        selectedImg = res;
                    })
                    .catch(err => console.log(err))
                thumbnail = await imgProvider(selectedImg);
            }
            params.data.createdBy = user
            params.data.updatedBy = user
            const {json} = await httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify({...params.data, link: thumbnail, createdBy: user, updatedBy: user}),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                }),
                credentials: 'include'
            })

            window.location.href = `/#/${resource}`
            return Promise.resolve({data: json});
        } else {
            params.data.createdBy = user;
            params.data.updatedBy = user;
            const {json} = await httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify(resource === "warehouse" ? {
                    ...params.data.ImportInvoiceRequest,
                    createdBy: user
                } : {...params.data, createdBy: user, updatedBy: user}),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }),
                credentials: 'include'
            })
            // switch to window /#/resource
            window.location.href = `/#/${resource}`
            return Promise.resolve({data: json});
        }

    },
    update: async (resource: any, params: any) => {
        const user = await getUserByToken();
        let thumbnail = null;
        const token: any = localStorage.getItem("auth")
        let imageProducts = [];
        console.log(" updated params: ", params)
        let category = null;
        let colorSizes = null;
        //
        if (resource === 'user') {
            console.log('Params user: ', params)
            let avatarLink
            try {
                if (typeof params.data.avatar.src !== 'undefined') {
                    const avt = cloneFile(params.data.avatar.src.rawFile,
                        params.data.avatar.src.rawFile.name);
                    // @ts-ignore
                    avatarLink = JSON.parse(await getImageUrl(avt))
                }
                const bodyParams: any = {
                    email: params.data.userInformation.email,
                    fullName: params.data.userInformation.fullName,
                    phone: params.data.userInformation.phone,
                    permission: params.data.permission.id,
                    status: params.data.status.toString(),
                    avatarLink: avatarLink
                }
                const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
                    method: 'PUT',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    }),
                    body: JSON.stringify(bodyParams),
                    credentials: 'include',

                });
                console.log('Response update: ', json)
                if (json.statusCodeValue === 400) return Promise.reject(new Error('Lỗi thao tác'));
                await addLog(`Sửa thông tin người dùng có username ${params.data.id}`)
                // window.location.href = `/#/${resource}`;
                return Promise.resolve({data: json});
            } catch (e) {
                window.location.href = `/#/${resource}/${params.id}`
                return Promise.reject(new Error('Không đủ quyền hạng để thực hiện'));
            }
        }

        if (resource === 'order'){
            console.log('params order: ', params)
            const bodyParams = {
                deliveryId: params.data.deliveryStatus.id
            }
            console.log('Body params order: ', bodyParams)
            const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(bodyParams),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }),
                credentials: 'include'
            });
            console.log('Res order: ', json)
            await addLog(`Sửa thông tin đơn hàng có id ${params.id}`)
            window.location.href = `/#/${resource}`;
            return Promise.resolve({data: json});
        }

        if(resource === 'order/confirm'){
            const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify(params),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }),
                credentials: 'include'
            });

            await addLog(`Sửa thông tin mã giảm giá có id ${params.id}`)
            window.location.href = `/#/${resource}`;
            return Promise.resolve({data: json});
        }

        if (resource === 'discount-code') {
            try {
                const param = {...params.data, token: localStorage.getItem("auth")}

                console.log(param)
                const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(param),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${token}`,
                    }),
                    credentials: 'include'
                });

                await addLog(`Sửa thông tin mã giảm giá có id ${params.id}`)
                window.location.href = `/#/${resource}`;
                return Promise.resolve({data: json});
            } catch (e) {
                console.log(e)
            }
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
            params.data.updatedBy = user;
            const {json: categoryJson} = await httpClient(`${apiUrl}/category/${params.data.category.id}`, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
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
                    imageProducts: imageProducts.length > 0 ? imageProducts : params.data.imageProducts,
                    updatedBy: user
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
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
            params.data.updatedBy = user;
            const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...params.data,
                    thumbnail: thumbnail !== null ? thumbnail : params.data.thumbnail,
                    updatedBy: user
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
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
            params.data.updatedBy = user;
            const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...params.data,
                    link: thumbnail !== null ? thumbnail : params.data.link,
                    updatedBy: user
                }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }),
                credentials: 'include'
            })
            window.location.href = `/#/${resource}`;
            return Promise.resolve({data: json});
        }
        //
        console.log(" updated params: ", params)
        params.data.updatedBy = user;
        const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: category ? JSON.stringify({
                ...params.data,
                category,
                colorSizes,
                user
            }) : JSON.stringify({...params.data, user}),
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
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

    delete: async (resource: any, params: any) => {
        // console.log('Permission: ', permission)
        try {
            const token: any = localStorage.getItem("auth")
            console.log('Stating delete...')
            const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }),
            });
            // console.log("Params: ", params)
            console.log("Data delete:", json)
            return {data: json};
        } catch (e) {
            return Promise.reject(new Error('Không đủ quyền hạng để thực hiện'));
        }
    },
}
