import styles from "@/styles/HeaderUser.module.css"
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

interface HeaderUserProps {
    dropdown?: boolean
}

function HeaderUser({ dropdown }: HeaderUserProps) {
    const { data: session } = useSession()

    // On checkout pages, the session is guaranteed
    const picture = session?.user.image as string

    if (!dropdown) {
        return <button className={styles.container} onClick={e => signOut({ callbackUrl: '/' })}>
            <span className={styles['text']}>Cerrar sesión</span>
            <Image src={picture} alt="user" className={styles['picture']} width={40} height={40} />
        </button>
    }

    return (
        <button className={`${styles.container} ${styles['dropdown']}`} onClick={e => signOut({ callbackUrl: '/' })}>
            <span className={styles['text']}>Cerrar sesión</span>
            <Image src={picture} alt="user" className={styles['picture']} width={40} height={40} />
        </button>
    )

}

export default HeaderUser