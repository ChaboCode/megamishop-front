import { ICartProduct } from "./cart"

export interface IPurchase {
    date: Date,
    id: number,
    total?: number
}

export interface IPurchaseData {
    products: ICartProduct[]
    date: Date
    id: number
    total: number
}
