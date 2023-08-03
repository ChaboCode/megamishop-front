import Image from "next/image"
import styles from "@/styles/HomeBanner.module.css"

export default function HomeBanner() {
    return (
        <div className={styles.container}>
            <div className={styles.homeBanner}>
                <button
                    className={`${styles.homeBannerSwitcher} ${styles.switcherLeft}`}
                />
                <div className={styles.homeBannerDisplay}>
                    <Image className={styles.homeBannerBackground} src={'/tojo.png'} alt="epic banner" width={600} height={300} />
                    <Image className={styles.homeBannerSlider} src={'/tojo.png'} alt="epic banner" width={600} height={300} />
                </div>
                <button
                    className={`${styles.homeBannerSwitcher} ${styles.switcherRight}`}
                />
            </div>
        </div>
    )
}
