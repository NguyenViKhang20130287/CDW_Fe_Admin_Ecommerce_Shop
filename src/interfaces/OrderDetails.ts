interface size {
    id: number,
    name: string
}

interface color {
    id: number,
    name: string
}

interface product {
    id: number,
    name: string,
    thumbnail: string
}

export interface OrderDetails {
    id: number,
    product: product,
    size: size,
    color: color,
    price: bigint,
    quantity: number
}