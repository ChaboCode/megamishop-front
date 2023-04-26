import styles from "@/styles/HeaderUser.module.css"
import {signIn, signOut, useSession} from "next-auth/react";
import Image from "next/image";

interface HeaderUserProps {
    dropdown?: boolean
}

function HeaderUser({dropdown}: HeaderUserProps) {
    const {data: session} = useSession()

    let picture = '/user.png'
    if (session && session.user) {
        picture = session.user.image as string
    }

    if(!dropdown) {
        return <button className={styles.container} onClick={e =>  session && session.user ? signOut() : signIn()}>
            <Image src={picture} alt="user" className={styles['picture']} width={40} height={40} />
        </button>
    }

    return (
        <button className={`${styles.container} ${styles['dropdown']}`} onClick={e =>  session && session.user ? signOut() : signIn()}>
            <Image src={picture} alt="user" className={styles['picture']} width={40} height={40} />
        </button>
    )

}

export default HeaderUser