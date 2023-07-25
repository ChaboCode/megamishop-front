import Image from 'next/image'
import Link from "next/link";

import styles from '@/styles/Home.module.css'

interface HeaderLinkParams {
    svg: any,
    text: string,
    href: string,
}

export default function HeaderLink({ svg, text, href }: HeaderLinkParams) {
    return (
        <>
            <Link href={href} className={styles.headerIconLink}>
                <Image className={styles.headerIcon} src={svg} alt="Box" width={50} height={50} />
                <div className={styles.headerLinkText}>{text}</div>
            </Link>
        </>
    )
}
