import styles from "@/styles/CartPrice.module.css"
import Link from "next/link";
import { useAppSelector } from "@/redux/checkoutSlice";

export interface CartData extends ServerResponse {
    id: number,
    total: number,
    isOneTime: boolean,
}


function CartPrice() {
    const total = useAppSelector(state => state.checkout.cart?.total)
    let price = <span className={styles['total']}>${total}.00</span>

    return (
        <div className={styles['container']}>
            <span className={styles['total-title']}>Total</span>
            {price}
            <Link href={"/checkout"} className={styles['checkout-button']}>Proceder al pago</Link>
        </div>
    )
}

export default CartPrice
