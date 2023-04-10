import Image from 'next/image'

import styles from '@/styles/Home.module.css'

interface HeaderLinkParams {
    svg: any,
    text: String,
}

export default function HeaderLink({ svg, text }: HeaderLinkParams) {
    return (
        <>
            <a className={styles.headerIconLink}>
                <Image className={styles.headerIcon} src={svg} alt="Box" />
                <div className={styles.headerLinkText}>{text}</div>
            </a>
        </>
    )
}
