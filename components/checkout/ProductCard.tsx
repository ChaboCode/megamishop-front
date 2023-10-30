import styles from "@/styles/ProductList.module.css"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { fetchCart, useAppDispatch } from "@/redux/checkoutSlice";

export interface ProductCardParams {
    picture: string,
    productID: number,
    cartProductID?: number,
    title: string,
    price: number,
    discount?: number,
    quantity: number,
    noSelector?: boolean
    allowDelete?: boolean,
}

function ProductCard({ picture, productID, cartProductID, title, price, quantity, allowDelete, noSelector }: ProductCardParams) {

    const [deleteStatus, setDeleteStatus] = useState("Eliminar")
    const dispatch = useAppDispatch()

    async function setQuantity(quantity: number) {
        const body = new URLSearchParams({
            cartProductID: cartProductID!.toString(),
            quantity: quantity.toString()  // FIXME
        })
        const result = await fetch(`/api/user/cart/${productID}/setQuantity`, {
            method: "POST",
            body: body
        })

        if (!result.ok) {
            alert("Ocurrió un error actualizando el carrito. Contacte al administrador.")
            return
        }
        fetchCart(dispatch)
    }

    async function decreaseQuantity() {
        setQuantity(quantity - 1)
    }

    async function increaseQuantity() {
        setQuantity(quantity + 1)
    }

    async function askForDeleteItem(productID: number) {
        setDeleteStatus("Eliminando...")
        const res = await fetch(`/api/cart/${productID}/delete`)
        const result = await res.json() as ServerResponse

        if (!result.success) {
            alert("No se pudo eliminar el artículo. Disculpe las molestias")
        }

        fetchCart(dispatch)
    }

    return (
        <div className={styles['card']}>
            <Image className={styles['picture']} src={picture} alt={'product'} width={200} height={150} />
            <div className={styles['info']}>
                <Link href={`/products/${productID}`} className={styles['title']}>{title}</Link>
                <div className={styles['prices']}>
                    <span className={styles['discount']}>900</span>
                    <span className={styles['unit-price']}>${price}</span>
                    {noSelector ? <div>.</div> : (
                        <div className={styles['quantity-selector']}>
                            <button
                                className={`${styles['quantity-button']} ${styles['minus']}`}
                                onClick={e => { decreaseQuantity() }}
                            >-</button>
                            <div className={'quantity'}>{quantity}</div>
                            <button
                                className={`${styles['quantity-button']} ${styles['plus']}`}
                                onClick={e => { increaseQuantity() }}
                            >+</button>
                        </div>

                    )}
                </div>
                {allowDelete ? (<button className={styles['delete']} onClick={e => askForDeleteItem(productID)}>{deleteStatus}</button>) : (<span />)}  {/* Necesary for flex design */}
            </div>
        </div>
    )
}

export default ProductCard
