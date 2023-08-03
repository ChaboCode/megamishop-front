import Image from "next/image"
import styles from "@/styles/Footer.module.css"
import { yoruka } from "@/types/fonts"

function Footer() {
    return (
        <div className={styles["container"]}>
            <div>
                <Image
                    className={styles["iso"]}
                    src={"/logo-contrast.svg"}
                    alt="MegamiShop"
                    width={200}
                    height={70}
                />
                <span className={`${yoruka.className} ${styles["logo"]}`}>
                    MegamiShop
                </span>
            </div>
            <span className={`${styles["copyright"]}`}>
                Saúl Chávez Sánchez, 2023
            </span>
        </div>
    )
}

export default Footer
