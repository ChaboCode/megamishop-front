import styles from "@/styles/ProductList.module.css"
import Image from "next/image";
import Link from "next/link";

interface ProductCardParams {
    picture: string,
    productID: number,
    title: string,
    price: number,
    discount?: number,
    quantity: number
}

function ProductCard({ picture, productID, title, price, quantity }: ProductCardParams) {
    return (
        <div className={styles['card']}>
            <Image className={styles['picture']} src={picture} alt={'product'} width={200} height={150} />
            <div className={styles['info']}>
                <Link href={`/products/${productID}`} className={styles['title']}>{title}</Link>
                <div className={styles['prices']}>
                    <span className={styles['discount']}>900</span>
                    <span className={styles['unit-price']}>${price}</span>
                    <div className={styles['quantity-selector']}>
                        <button
                            className={`${styles['quantity-button']} ${styles['minus']}`}
                            onClick={e => {}}
                        >-</button>
                        <div className={'quantity'}>{quantity}</div>
                        <button
                            className={`${styles['quantity-button']} ${styles['plus']}`}
                            onClick={e => {}}
                        >+</button>
                    </div>
                    <span className={styles['total-price']}>${price}</span>
                </div>
                <span></span>
            </div>
        </div>
    )
}

export default ProductCard
