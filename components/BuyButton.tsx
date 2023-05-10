import { Puff } from "react-loader-spinner"
import { useState } from "react";
import styles from "@/styles/ProductView.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface BuyButtonParams {
    productID: number;
}

function BuyButton({ productID }: BuyButtonParams) {
    const router = useRouter()
    const { data: session } = useSession()
    const [buyContent, setBuyContent] = useState<JSX.Element>(<>Comprar ahora</>)

    function buy() {
        const uid = session?.user.id
        if (!uid) {
            alert("Inicia sesión para realizar compras")
            return
        }

        setBuyContent(
            <div className={styles['loader']}>
                <Puff color="#333333" />
            </div>
        )

        fetch(`/api/cart/${productID}/onlybuy`, {
            method: 'POST',
            body: JSON.stringify({
                uid: uid
            })
        })
            .then(res => {
                if (res.status == 200) {
                    router.push(`/cart`)
                    return
                }
                alert("Error en la compra. Inténtalo de nuevo o reporta un fallo")
            })
            .catch(err => {
                alert("Error en la compra. Inténtalo de nuevo o reporta un fallo")
            })
            .finally(() => {
                setBuyContent(<>Comprar ahora</>)
            })
    }

    return (
        <Link href={'/lain'} className={`${styles.button} ${styles.buy}`}> {/* onClick={e => buy()}> */}
            {buyContent}
        </Link>
    )
}

// <Link href={`/products/buy/${product.id}`}>Comprar ahora</Link>
export default BuyButton;
