export interface ICartProduct {
    id: number,
    title: string,
    price: number,
    discount?: number,
    quantity: number,
}

export interface ICart {
    products: ICartProduct[]
}