export interface IProductState {
    id: number
    name: string
    price: number
    stock: number
    images: number
    desc: string  // Description
    //TODO: Add discount field
}

export interface IProductCardState {
    id: number
    name: string
    price: number
    stock: number
}

export interface ProductViewParams {
    product: IProductState | undefined | null;
}
