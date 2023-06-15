import styles from "@/styles/Purchase.module.css"
import Link from "next/link"
import HeaderUser from "./HeaderUser"

interface Params {
    subtitle?: string,
}

function Header({ subtitle }: Params) {

    return (
        <div className={styles["container"]}>
            <div>
                <Link href={"/"} className={styles["title"]}>
                    MegamiShop
                </Link>
                <span className={styles["subtitle"]}>{subtitle}</span>
            </div>
            <div>
                <HeaderUser />
            </div>
        </div>
    )
}

export default Header
