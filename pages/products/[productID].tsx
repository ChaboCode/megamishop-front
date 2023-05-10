import { useRouter } from 'next/router'
import { useEffect, useState } from "react"

import { IProductState } from "@/interfaces/products";

import MegamiHead from "@/components/MegamiHead";
import MegamiNavBar from "@/components/MegamiNavBar"
import ProductView from "@/components/views/ProductView";


const loadingProduct: IProductState = {
    price: 0,
    images: 0,
    stock: 999,
    desc: 'Please wait a bit',
    name: 'Loading...',
    id: -1,
}

function ProductPage() {
    const router = useRouter()
    const [isLoading, setLoading] = useState(false)
    const [product, setProduct] = useState<IProductState | undefined | null>(undefined)

    useEffect(() => {
        const { productID } = router.query
        setLoading(true)
        fetch(`/api/products/${productID}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data)
                setLoading(false)
            })
    }, [router.query])

    let productView: JSX.Element

    if (isLoading) productView = <ProductView product={loadingProduct} />
    else productView = <ProductView product={product} />

    return (
        <>
            <MegamiHead />
            <MegamiNavBar />

            {productView}
        </>
    )
}

export default ProductPage
