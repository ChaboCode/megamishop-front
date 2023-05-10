import React, {useEffect, useState} from "react";
import ProductCard, { ProductCardParams } from "@/components/checkout/ProductCard";
import { IProductState } from "@/interfaces/products";

interface Params {
    ids: number[]
}

function ProductCardHelper({ ids }: Params): JSX.Element {
    const [cards, setCards] = useState<JSX.Element[]>([])
    const [isLoading, setLoading] = useState(false)

    // FIXME: Shitty code
    // Please someone fix this fucking shit
    useEffect(() => {
        setLoading(true)
        const products: JSX.Element[] = []
        if(ids.length == 0 || ids.filter(value => isNaN(value)).length > 0) return
            let count = 0
            for (const id of ids) {
                fetch(`/api/products/${id}`)
                    .then(res => res.json())
                    .then(product => {
                        const {price, name} = product
                        products.push(<ProductCard key={id} productID={id} price={price} quantity={-1} title={name}
                                                   picture={`/products/${id}_0.png`}/>)
                        count++
                        if (count == ids.length) {
                            setCards(products)
                            setLoading(false)
                        }
                    })
            }
    },[ids])

    if(isLoading) {
        return <div>Loading...</div>
    }

    return <>{cards.map((card) => (
        <div key={card.props.id}>
            {card}
        </div>
    ))}</>
}

export default ProductCardHelper
