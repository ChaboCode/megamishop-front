import { useSession, signIn, signOut } from 'next-auth/react'

import styles from '@/styles/Home.module.css'
import Link from 'next/link'

import HeaderLink from '@/components/HeaderLink'
import svgBox from '@/public/box.svg'

export default function Header() {
    const { data: session } = useSession()
    return (
        <>
            <header className={styles.header}>
                <span className={styles.headerAccount} />
                <div className={styles.headerElements}>
                    <div className={styles.headerIconsLeft}>
                        <HeaderLink svg={svgBox} text={'Figuras'} />
                        <HeaderLink svg={svgBox} text={'Pokemon'} />
                        <HeaderLink svg={svgBox} text={'Vocaloid'} />
                    </div>
                    <Link href={'/'} className={styles.headerTitle}>
                        MonaShop
                    </Link>
                    <div className={styles.headerIconsLeft + ' ' + styles.headerIconsRight}>
                        <HeaderLink svg={svgBox} text={'Ropa'} />
                        <HeaderLink svg={svgBox} text={'Cartas'} />
                        <HeaderLink svg={svgBox} text={'Dulces'} />
                    </div>
                </div>
                <div className={styles.headerAccount}>
                    {session && session.user ? (

                        <button onClick={() => signOut()}>Cerrar Sesi&oacute;n</button>
                    ) : (

                        <button onClick={() => signIn()}>Inicia Sesi&oacute;n</button>
                    )

                    }
                </div>
            </header>
            <div className={styles.headerAccent}></div>
        </>

    )
}
