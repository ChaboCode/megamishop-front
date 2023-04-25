import { ProductViewParams } from "@/interfaces/products";
import styles from "@/styles/ProductView.module.css"
import Image from "next/image";
import Link from "next/link";
import { GetProductPictureURL } from "@/components/views/ProductView";
import exp from "constants";

function ProductCard({ product }: ProductViewParams) {
    if (product == null) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <Image
                    src={GetProductPictureURL(product.id, 0)}
                    alt={product.name}
                    width={1000}
                    height={1000}
                    className={styles.pictures} />
                <div className={styles.info}>
                    <div>
                        <span className={styles.title}>{product.name}</span>
                        <p className={styles.desc}>{product.desc}</p>
                    </div>
                    <div className={styles["buy-container"]}>
                        <span className={styles.price}>${product.price}</span>
                        <Link href={`/products/buy/${product.id}`} className={`${styles.button} ${styles.buy}`}>Comprar ahora</Link>
                        <Link href={`/cart/add/${product.id}`} className={`${styles.button} ${styles.cart}`}>Agregar al carrito</Link>
                        <div className={styles.stock}>
                            DISPONIBLES: {product.stock}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
