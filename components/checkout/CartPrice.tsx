import styles from "@/styles/CartPrice.module.css"
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export interface CartData {
    id: number,
    total: number,
    isOneTime: boolean,
}

function CartPrice() {
    const { data: session } = useSession()

    const [total, setTotal] = useState(69)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        const uid = session?.user.id
        setLoading(true)
        fetch(`/api/user/cart/total`)
            .then(res => res.json())
            .then(res => {
                console.info(res)
                setTotal(res.total)
                setLoading(false)
            })
    }, [session?.user.id])

    useEffect(() => {
        const uid = session?.user.id
    })

    let price: JSX.Element
    if (isLoading) {
        price = <span>Loading...</span>
    } else {
        price = <span className={styles['total']}>${total}.00</span>
    }

    return (
        <div className={styles['container']}>
            <span className={styles['total-title']}>Total</span>
            {price}
            <Link href={"/checkout"} className={styles['checkout-button']}>Proceder al pago</Link>
        </div>
    )
}

export default CartPrice