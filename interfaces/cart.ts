export interface ICartProduct {
    cartProductId: number,
    productID: number,
    title: string,
    price: number,
    discount?: number,
    quantity: number,
}

export interface ICart {
    products: ICartProduct[]
}