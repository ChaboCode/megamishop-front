import styles from "@/styles/HeaderUser.module.css"
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

interface HeaderUserProps {
    dropdown?: boolean
}

function HeaderUser({ dropdown }: HeaderUserProps) {
    const { data: session } = useSession()
    const router = useRouter()

    let picture = '/user.png'
    if (session && session.user) {
        picture = session.user.image as string
    }

    function handleUser() {
        if (!session) signIn()
        router.push('/user')
    }

    if (!dropdown) {
        return <button className={`${styles.container} ${styles.dark} `} onClick={e => handleUser()}>
            <Image src={picture} alt="user" className={styles['picture']} width={40} height={40} />
        </button>
    }

    return (
        <button className={`${styles.container} ${styles['dropdown']} ${styles.dark}}`} onClick={e => handleUser()}>
            <Image src={picture} alt="user" className={styles['picture']} width={40} height={40} />
        </button>
    )

}

export default HeaderUser