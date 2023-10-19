import styles from "@/styles/ProductList.module.css"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface ProductCardParams {
    picture: string,
    productID: number,
    title: string,
    price: number,
    discount?: number,
    quantity: number,
}

function ProductCard({ picture, productID, title, price, quantity }: ProductCardParams) {

    const [deleteStatus, setDeleteStatus] = useState("Eliminar")

    async function decreaseQuantity() {
        await fetch('/api/')
    }

    async function askForDeleteItem(productID: number) {
        setDeleteStatus("Eliminando...")
    }

    return (
        <div className={styles['card']}>
            <Image className={styles['picture']} src={picture} alt={'product'} width={200} height={150} />
            <div className={styles['info']}>
                <Link href={`/products/${productID}`} className={styles['title']}>{title}</Link>
                <div className={styles['prices']}>
                    <span className={styles['discount']}>900</span>
                    <span className={styles['unit-price']}>${price}</span>
                    {quantity >= 0 && (
                        <div className={styles['quantity-selector']}>
                            <button
                                className={`${styles['quantity-button']} ${styles['minus']}`}
                                onClick={e => { decreaseQuantity() }}
                            >-</button>
                            <div className={'quantity'}>{quantity}</div>
                            <button
                                className={`${styles['quantity-button']} ${styles['plus']}`}
                                onClick={e => { }}
                            >+</button>
                        </div>

                    )}
                </div>
                <button className={styles['delete']} onClick={e => askForDeleteItem(productID)}>{deleteStatus}</button>  {/* Necesary for flex design */}
            </div>
        </div>
    )
}

export default ProductCard
