import styles from '@/styles/Home.module.css'

import HeaderLink from '@/pages/components/HeaderLink'
import svgBox from '@/public/box.svg'

export default function Header () {
    return (
    <>
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerIconsLeft}>
            <HeaderLink svg={svgBox} text={'Figuras'}/>
            <HeaderLink svg={svgBox} text={'Pokemon'}/>
            <HeaderLink svg={svgBox} text={'Vocaloid'}/>
          </div>
          <div className={styles.headerTitle}>
            MonaShop
          </div>
          <div className={styles.headerIconsLeft + ' ' + styles.headerIconsRight}>
            <HeaderLink svg={svgBox} text={'Ropa'}/>
            <HeaderLink svg={svgBox} text={'Cartas'}/>
            <HeaderLink svg={svgBox} text={'Dulces'}/>
          </div>
        </header>
        <div className={styles.headerAccent}></div>
      </main>
    </>

    )
}