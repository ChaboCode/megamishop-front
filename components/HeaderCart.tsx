import Image from "next/image"
import Link from "next/link"
import { useSession, signIn } from "next-auth/react"
import { PropsWithChildren } from "react"
import cart from "@/pages/cart"
import styles from "@/styles/HeaderUser.module.css"

interface HeaderCartProps {
    dropdown?: boolean
}

function HeaderCart({ dropdown }: HeaderCartProps) {
    const { data: session } = useSession()

    const CartPicture = (
        <Image
            className={`${styles["cart-picture"]} ${styles["dark"]}`}
            src={"/shopping-cart.png"}
            alt={"Carrito"}
            width={50}
            height={50}
        />
    )
    const CartComponent = (
        <Link href={"/cart"} className={styles["container"]}>
            {CartPicture}
        </Link>
    )

    const CartLogin = (
        <button onClick={() => signIn()} className={styles["container"]}>
            {CartPicture}
        </button>
    )

    if (dropdown) {
        return (
            <Link
                href={"/cart"}
                className={`${styles["container"]} ${styles["dropdown"]}`}>
                {CartPicture}
            </Link>
        )
    }

    if (session && session.user) {
        return CartComponent
    }

    return CartLogin
}

export default HeaderCart
