import styles from '@/styles/Purchase.module.css'
import CheckoutHeader from "@/components/checkout/header";
import ProductList from "@/components/checkout/ProductList";
import CartPrice from "@/components/checkout/CartPrice";

function Cart() {
    return (
        <>
            <CheckoutHeader />
            <div className={styles['ticket']}>
                <ProductList />
                <CartPrice />
            </div>
        </>
    )
}

export default Cart