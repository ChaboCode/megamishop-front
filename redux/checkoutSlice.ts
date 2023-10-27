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

export function fetchCart(dispatch: AppDispatch) {
    fetch('/api/user/cart/')
        .then(res => res.json())
        .then(res => {
            dispatch(update(res))
        })
}

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        updateCart: (state, action) => {
            state.cart = action.payload as ICart
        }
    }
})

export const { updateCart: update } = checkoutSlice.actions
export default checkoutSlice.reducer

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector