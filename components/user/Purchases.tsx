import styles from '@/styles/User.module.css'
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {IPurchase} from "@/interfaces/purchase";
function UserPurchases() {
    const { data: session } = useSession()
    const [purchases, setPurchases] = useState<JSX.Element|JSX.Element[]>(<>Loading</>)  // List of purchases
    const [purchase, setPurchase] = useState<JSX.Element|JSX.Element[]>(<>Loading</>) // List of products in selected purchase
    const [purchaseSelection, setSelection] = useState(1)
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetch(`/api/user/purchases/${page}`)
            .then(async response => {
                const purchases = await response.json()
                setPurchases(purchases.map((p: IPurchase) => {
                    return (
                        <div className={styles['purchases']} key={p.id}>
                            <button className={styles['purchaseButton']} onClick={e => selectPurchase(p.id)}>
                                <span className={styles['date']}>{p.date}</span>
                            </button>
                        </div>
                    )
                }))
            })
        fetch(`/api/user/purchase/${purchaseSelection}`)
            .then(async response => {
                const purchase = await response.json();
                setPurchase(purchase)
            })

    }, [session, page])

    function selectPurchase(id: number) {
        setSelection(id)
    }

    return (
        <div className={styles['container']}>
            <div className={styles['card']}>
                {purchases}
                <div className={styles['divider']} />
                <div className={styles['purchase']}>

                </div>
            </div>
        </div>
    )
}

export default UserPurchases
