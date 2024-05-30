import {RaRecord} from 'react-admin';
export interface Category extends RaRecord {
    id: number,
    name: string,
    status: boolean,
    created_at: string,
    created_by: User,
    updated_at: string,
    updated_by: User
}

export interface Product extends RaRecord {
    id: number,
    category: Category,
    name: string,
    thumbnail: string,
    content: string,
    price: number,
    quantity: number,
    sold: number,
    status: boolean,
    created_at: string,
    created_by: User,
    updated_at: string,
    updated_by: User
}

export interface User extends RaRecord {
    id: number,
    username: string,
    password: string,
    isAdmin: boolean,
    status: boolean
}

export interface Color extends RaRecord {
    id: number,
    name: string
}

export interface Size extends RaRecord {
    id: number,
    name: string
}

export interface Promotion extends RaRecord {
    id: number,
    name: string,
    description: string,
    discount_rate: number,
    start_date: string,
    end_date: string,
    status: boolean,
    created_at: string,
    created_by: User,
    updated_at: string,
    updated_by: User
}

export interface ColorSize extends RaRecord {
    id: number,
    color: Color,
    size: Size,
    quantity: number
}
