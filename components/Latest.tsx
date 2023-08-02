import { useEffect, useState } from "react";
import CardView, { CardItemProps } from "@/components/views/CardView";
import styles from '@/styles/Category.module.css'

import { yoruka } from "@/types/fonts";

function Latest() {
    const [cards, setCards] = useState<CardItemProps[]>([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('/api/products/latest/10')
            .then(res => res.json())
            .then(data => {
                setCards(data)
                setLoading(false)
            })
    }, [])

    let cardView: JSX.Element = <></>

    if (isLoading) cardView = <p>Loading</p>
    if (cards) cardView = <CardView cards={cards as CardItemProps[]} />

    return (
        <>
            <div className={styles['container']}>

                <p className={`${styles['title']} ${yoruka.className}`}>Mercancia fresca</p>
            </div>
            {cardView}
        </>
    )
}

export default Latest
