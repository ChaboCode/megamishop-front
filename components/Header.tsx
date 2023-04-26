import { useSession, signIn, signOut } from 'next-auth/react'

import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Image from "next/image";

import HeaderLink from '@/components/HeaderLink'
import svgBox from '@/public/box.svg'
import HeaderUser from "@/components/HeaderUser";
import HeaderCart from "@/components/HeaderCart";
import HeaderDropdown from "@/components/HeaderDropdown";
import {useState} from "react";

export default function Header() {
    const { data: session } = useSession()
    const [isMenuOpen, setMenuOpen] = useState(false)

    return (
        <>
            <header className={styles.header}>
                <button className={styles['dropdown-button']} onClick={e => setMenuOpen(!isMenuOpen)}>
                    <Image src={'/menu.png'} alt="Menu" width={40} height={40}/>
                </button>
                <div className={styles.headerElements}>
                    <div className={styles.headerIconsLeft}>
                        <HeaderLink svg={svgBox} text={'Figuras'} />
                        <HeaderLink svg={svgBox} text={'Pokemon'} />
                    </div>
                    <Link href={'/'} className={styles.headerTitle}>
                        MegamiShop
                    </Link>
                    <div className={styles.headerIconsLeft + ' ' + styles.headerIconsRight}>
                        <HeaderLink svg={svgBox} text={'Ropa'} />
                        <HeaderLink svg={svgBox} text={'Cartas'} />
                    </div>
                </div>
                <div className={styles.headerAccount}>
                    <span></span>
                    <HeaderCart />
                    <HeaderUser />
                </div>
            </header>

            <div className={styles['dropdown']} style={{display: isMenuOpen ? 'flex' : 'none'}}>
                <HeaderLink svg={svgBox} text={'Figuras'} />
                <HeaderLink svg={svgBox} text={'Pokemon'} />
                <HeaderLink svg={svgBox} text={'Ropa'} />
                <HeaderLink svg={svgBox} text={'Cartas'} />
                <HeaderCart dropdown/>
                <HeaderUser dropdown/>
            </div>
        </>
    )
}
