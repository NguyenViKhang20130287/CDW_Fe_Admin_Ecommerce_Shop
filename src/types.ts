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
    permission: Permission,
    status: boolean
    user_information: UserInformation
}

export interface UserInformation extends RaRecord {
    id: number,
    full_name: string,
    email: string,
    phone: string,
    address: string,
    avatar: string,
    created_at: string,
    updated_at: string
}

export interface Permission extends RaRecord {
    id: number,
    name: string
}

export interface Color extends RaRecord {
    id: number,
    name: string,
    color_code: string
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

export interface Blog extends RaRecord {
    id: number,
    title: string,
    description: string,
    content: string,
    thumbnail: string,
    status: boolean,
    created_at: string,
    created_by: User,
    updated_at: string,
    updated_by: User
}

export interface Order extends RaRecord {
    id: number,
    user: User,
    full_name: string,
    address: string,
    phone: string,
    payment_method: string,
    payment_status: string,
    total_amount: number,
    discount_code: DiscountCode,
    shipping_cost: number,
    created_at: string,
    order_details: OrderDetail[]
}

export interface OrderDetail extends RaRecord {
    id: number,
    order: Order,
    product: Product,
    product_name: string,
    color: Color,
    size: Size,
    quantity: number,
    price: number
}

export interface DiscountCode extends RaRecord {
    id: number,
    code: string,
    discount_rate: number,
    start_date: string,
    end_date: string,
    status: boolean,
    created_at: string,
    created_by: User,
    updated_at: string,
    updated_by: User
}

export interface Review extends RaRecord {
    id: number,
    user: User,
    product: Product,
    stars: number,
    content: string,
    type_status: number,
    order_detail: OrderDetail,
    created_at: string
}
