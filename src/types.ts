import {RaRecord} from 'react-admin';

export interface Category extends RaRecord {
    id: number,
    name: string,
    status: boolean,
    createdAt: string,
    createdBy: User,
    updatedAt: string,
    updatedBy: User
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
    createdAt: string,
    createdBy: User,
    updatedAt: string,
    updatedBy: User
}

export interface User extends RaRecord {
    id: number,
    username: string,
    password: string,
    permission: Permission,
    status: boolean
    userInformation: UserInformation
}

export interface UserInformation extends RaRecord {
    id: number,
    full_name: string,
    email: string,
    phone: string,
    address: string,
    avatar: string,
    createdAt: string,
    updatedAt: string
}

export interface Permission extends RaRecord {
    id: number,
    name: string
}

export interface Color extends RaRecord {
    id: number,
    name: string,
    colorCode: string
}

export interface Size extends RaRecord {
    id: number,
    name: string
}

export interface Promotion extends RaRecord {
    id: number,
    name: string,
    description: string,
    discountRate: number,
    startDate: string,
    endDate: string,
    status: boolean,
    createdAt: string,
    createdBy: User,
    updatedAt: string,
    updatedBy: User
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
    createdAt: string,
    createdBy: User,
    updatedAt: string,
    updatedBy: User,
    isDeleted: boolean
}

export interface Order extends RaRecord {
    id: number,
    user: User,
    full_name: string,
    address: string,
    phone: string,
    paymentMethod: string,
    paymentStatus: string,
    totalAmount: number,
    discountCode: DiscountCode,
    shipping_cost: number,
    createdAt: string,
    orderDetails: OrderDetail[]
}

export interface OrderDetail extends RaRecord {
    id: number,
    order: Order,
    product: Product,
    productName: string,
    color: Color,
    size: Size,
    quantity: number,
    price: number
}

export interface DiscountCode extends RaRecord {
    id: number,
    code: string,
    discountRate: number,
    startDate: string,
    endDate: string,
    status: boolean,
    createdAt: string,
    createdBy: User,
    updatedAt: string,
    updatedBy: User
}

export interface Review extends RaRecord {
    id: number,
    user: User,
    product: Product,
    stars: number,
    content: string,
    typeStatus: number,
    orderDetail: OrderDetail,
    createdAt: string
}

export interface Slider extends RaRecord {
    id: number,
    link: string,
    description: string,
    status: boolean,
    createdAt: string,
    createdBy: User,
    updatedAt: string,
    updatedBy: User
}

export interface ImportInvoice extends RaRecord {
    id: number,
    totalAmount: number,
    createdAt: string,
    importInvoiceDetails: ImportInvoiceDetail[]

}

export interface ImportInvoiceDetail extends RaRecord{
    id: number,
    importInvoice: ImportInvoice,
    product: Product,
    color: Color,
    size: Size,
    import_price: number,
    quantity: number
}
