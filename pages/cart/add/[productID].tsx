import MegamiHead from "@/components/MegamiHead";
import MegamiNavBar from "@/components/MegamiNavBar"
import { useRouter } from "next/router";
import ProductCardHelper from "@/components/helper/ProductCard";
import { PremadeProductList } from "@/components/checkout/ProductList";
import Latest from "@/components/Latest";

import styles from '@/styles/CartPreview.module.css'
import stylesProductView from '@/styles/ProductView.module.css'
import { useSession } from "next-auth/react";
import { useEffect } from "react";

function AddItemToCart() {
    const router = useRouter()
    const { productID } = router.query
    const { data: session } = useSession()

    useEffect(() => {
        if (session == null) {
            router.push('/')
        }
    }, [router, session])

    const item = <ProductCardHelper ids={[parseInt(productID as string)]} />

    function goToCart() {
        router.push('/cart')
    }

    return (
        <>
            <MegamiHead />
            <MegamiNavBar />
            <div className={styles['container']}>
                <div className={styles['card']}>
                    <PremadeProductList list={item} />
                    <div className={stylesProductView['buy-container']}>
                        <span className={styles['title']}>¡Producto agregado!</span>
                        <span className={styles['info']}>
                            Puedes seguir a&ntilde;adiendo productos
                            o realizar tu compra
                            <button className={`${stylesProductView['button']} ${stylesProductView['buy']}`} onClick={e => goToCart()}>Tu Carrito</button>
                        </span>
                    </div>
                </div>
            </div>
            <Latest />
        </>
    )
}

export default AddItemToCart
