import MegamiHead from "@/components/MegamiHead"
import MegamiNavBar from "@/components/MegamiNavBar"
import Latest from "@/components/Latest";
import Image from "next/image";

import styles from "@/styles/lain.module.css"

function LainError() {
    return (
        <>
            <MegamiHead title={"Not working u.U"} />
            <MegamiNavBar />
            <div className={styles['container']}>
                <div className={styles['card']}>
                    <Image className={styles['lain']} src={'/lain-rig.jpg'} alt={"lain building her gaming rig"} width={500} height={500} />
                    <span className={styles['title']}>Esta p&aacute;gina a&uacute;n no est&aacute; disponible u.U</span>
                    <span className={styles['advice']}>Si intentaste <b>comprar</b> un producto directamente, prueba a primero <b>agregarlo al carrito</b> y despues a comprarlo desde ahi.</span>
                </div>
            </div>
            <Latest />
        </>
    )
}

export default LainError
