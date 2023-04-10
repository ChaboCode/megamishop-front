import styles from '@/styles/HomeBanner.module.css'

export default function HomeBanner() {
    return (
        <div className={styles.homeBanner}>
            <button className={`${styles.homeBannerSwitcher} ${styles.switcherLeft}`} />
            <div className={styles.homeBannerDisplay}>
                <div className={styles.homeBannerSlider}>

                </div>
            </div>
            <button className={`${styles.homeBannerSwitcher} ${styles.switcherRight}`} />

        </div>
    )
}