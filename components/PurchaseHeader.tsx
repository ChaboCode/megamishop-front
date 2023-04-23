import styles from '@/styles/Purchase.module.css'
import Link from "next/link";

function PurchaseHeader() {
    return (
        <div className={styles['container']}>
            <Link href={'/'} className={styles['title']}>MegamiShop</Link>
        </div>
    )
}

export default PurchaseHeader
