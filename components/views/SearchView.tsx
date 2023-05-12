import {useEffect, useState} from "react";
import CardView, {CardItemProps} from "@/components/views/CardView";

interface Props {
    query: string;
}

function SearchView({query}: Props) {
    const [cards, setCards] = useState<CardItemProps[]>([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`/api/products/search/${query}`, {
            method: 'POST',
            body: JSON.stringify({
                query: query
            })
        })
            .then(res => res.json())
            .then(data => {
                setCards(data)
                setLoading(false)
            })
    }, [query])

    let cardView: JSX.Element = <></>

    if (isLoading) cardView = <p>Loading</p>
    if (cards) cardView = <CardView cards={cards as CardItemProps[]} />

    return cardView
}

export default SearchView
