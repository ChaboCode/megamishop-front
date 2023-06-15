import { useSession, signIn, signOut } from 'next-auth/react'

import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Image from "next/image";

import HeaderLink from '@/components/HeaderLink'
import svgBox from '@/public/box.svg'
import HeaderUser from "@/components/HeaderUser";
import HeaderCart from "@/components/HeaderCart";
import HeaderDropdown from "@/components/HeaderDropdown";
import { useState } from "react";

export default function Header() {
    const [isMenuOpen, setMenuOpen] = useState(false)

    return (
        <>
            <header className={styles.header}>
                <button className={styles['dropdown-button']} onClick={e => setMenuOpen(!isMenuOpen)}>
                    <Image src={'/menu.png'} alt="Menu" width={40} height={40} />
                </button>
                <div className={styles.headerElements}>
                    <div className={styles.headerIconsLeft}>
                        <HeaderLink svg={svgBox} text={'Figuras'} href={'/category/figures'} />
                        <HeaderLink svg={svgBox} text={'Pokemon'} href={'/lain'} />
                    </div>
                    <Link href={'/'} className={styles.headerTitle}>
                        MegamiShop
                    </Link>
                    <div className={styles.headerIconsLeft + ' ' + styles.headerIconsRight}>
                        <HeaderLink svg={svgBox} text={'Ropa'} href={'/lain'} />
                        <HeaderLink svg={svgBox} text={'Cartas'} href={'/category/cards'} />
                    </div>
                </div>
                <div className={styles.headerAccount}>
                    <span></span>
                    <HeaderCart />
                    <HeaderUser />
                </div>
            </header>

            <div className={styles['dropdown']} style={{ display: isMenuOpen ? 'flex' : 'none' }}>
                <HeaderLink svg={svgBox} text={'Figuras'} href={'/figuras'} />
                <HeaderLink svg={svgBox} text={'Pokemon'} href={'/lain'} />
                <HeaderLink svg={svgBox} text={'Ropa'} href={'/lain'} />
                <HeaderLink svg={svgBox} text={'Cartas'} href={'/cartas'} />
                <HeaderCart dropdown />
                <HeaderUser dropdown />
            </div>
        </>
    )
}
