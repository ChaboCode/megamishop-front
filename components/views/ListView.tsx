import { useEffect, useState } from "react";
import CardView, { CardItemProps } from "@/components/views/CardView";
import styles from '@/styles/Category.module.css'
import { category } from "@prisma/client";
import api from "@/pages/api";

interface Params {
    apiQuery: category,
    title: string
}

function ListView({ apiQuery, title }: Params) {
    const [cards, setCards] = useState<CardItemProps[]>([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`/api/products/category/${apiQuery}/1`)
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
                <p className={styles['title']}>{title}</p>
            </div>
            {cardView}
        </>
    )
}

export default ListView
