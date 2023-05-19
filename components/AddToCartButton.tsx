import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import styles from "@/styles/ProductView.module.css";

interface AddToCartParams {
    productID: number
}

function AddToCartButton({ productID }: AddToCartParams) {
    const router = useRouter()
    const { data: session } = useSession()

    const [cartState, setCartState] = useState("Agregar al carrito")

    function addToCart() {
        if (session == null) {
            signIn()
            return
        }
        setCartState("Agregando...")
        fetch(`/api/cart/${productID}/add`, {
            method: 'post',
            body: JSON.stringify({
                uid: session?.user.id
            })
        })
            .then(res => {
                if (res.status == 200) {
                    // TODO: Create floating messages
                    setCartState("¡Agregado!")
                    router.push(`/cart/add/${productID}`)
                    return
                }
                // TODO: Create floating messages
                alert("Failed to save cart")
            })
            .catch(err => {
                // TODO: Create floating messages
                alert("Failed to save cart")
                setCartState("Agregar al carrito")
            })
    }

    return (
        <button className={`${styles.button} ${styles.cart}`} onClick={e => addToCart()}>{cartState}</button>
    )
}

export default AddToCartButton
