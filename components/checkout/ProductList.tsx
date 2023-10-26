import styles from "@/styles/ProductList.module.css"
import ProductCard from "@/components/checkout/ProductCard";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

import getConfig from "next/config"
import { useAppSelector } from "@/redux/checkoutSlice";
const { publicRuntimeConfig } = getConfig()
const { MINIO_ENDPOINT } = publicRuntimeConfig

interface PremadeParams {
    list: JSX.Element
}

// FIXME: It should be PreviewProductList, not PremadeProductList
export function PremadeProductList({ list }: PremadeParams) {
    return (
        <div className={`${styles['container']} ${styles['premade']}`}>
            {list}
        </div>
    )
}

function ProductList() {
    const { data: session } = useSession()
    const cart = useAppSelector(state => state.checkout.cart)

    useEffect(() => {
        const uid = session?.user.id
        if (uid == undefined) {
            return
        }
    }, [session?.user.id])

    let list: JSX.Element
        list = <>{cart?.products.map(product => {
            const { productID: id, title, price, quantity } = product
            return <ProductCard key={id} picture={`http://${MINIO_ENDPOINT}/web/${id}_0.png`} productID={id} title={title}
                price={price} quantity={quantity} />
        })}</>

    return (
        <div className={styles['container']}>
            {list}
        </div>
    )
}

export default ProductList
