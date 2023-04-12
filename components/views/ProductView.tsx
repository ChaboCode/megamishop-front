import Image from "next/image";
import { IProductState } from "@/interfaces/products";

import styles from "@/styles/ProductView.module.css"

interface ProductViewParams {
    product: IProductState | undefined | null;
}

function GetProductPictureURL(id: number, image: number): string {
    return `/products/${id}_${image}.png`
}

function GetProductPictureURLs(id: number, images: number): string[] {
    let imagesURLs = []
    for (let i = 0; i < images; i++) {
        imagesURLs.push(GetProductPictureURL(id, i))
    }
    return imagesURLs
}

function ProductView({ product }: ProductViewParams) {
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
                        <button className={`${styles.button} ${styles.buy}`}>Comprar ahora</button>
                        <button className={`${styles.button} ${styles.cart}`}>Agregar al carrito</button>
                        <div className={styles.stock}>
                            DISPONIBLES: {product.stock}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { GetProductPictureURL }
export default ProductView
