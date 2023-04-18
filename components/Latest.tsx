import { useEffect, useState } from "react";
import CardView, { CardItemProps } from "@/components/views/CardView";

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

    return cardView
}

export default Latest
