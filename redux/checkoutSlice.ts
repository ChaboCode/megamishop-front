import { createSlice } from "@reduxjs/toolkit";
import { ICart } from "@/interfaces/cart"
import { AppDispatch, RootState } from "./store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface CheckoutState {
    cart?: ICart 
}

const initialState: CheckoutState = {
    cart: {
        products: [],
        success: true,
        total: 0
    }
}

async function updateCart(): ICart {
    const res = await fetch('/api/user/cart');
    const cart = await res.json()
    return cart as ICart
}

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        update: state => {
            
        }
    }
})

export const { update } = checkoutSlice.actions
export default checkoutSlice.reducer

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector