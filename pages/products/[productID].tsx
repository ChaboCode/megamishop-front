import { useRouter } from 'next/router'
import { useEffect, useState } from "react"

import { IProductState } from "@/interfaces/products";

import MegamiHead from "@/components/MegamiHead";
import MegamiNavBar from "@/components/MegamiNavBar"
import ProductView from "@/components/views/ProductView";

function ProductPage() {
    const router = useRouter()

    const [product, setProduct] = useState<IProductState | undefined | null>(undefined)
    useEffect(() => {
        const { productID } = router.query
        getProduct({ productID: productID as string })
    }, [router.query])

    const getProduct = async ({ productID }: { productID: string }) => {
        const res = await fetch(`/api/products/${productID}`)
        const product = await res.json()
        setProduct(product || null)
    }
    console.log(product)
    return (
        <>
            <MegamiHead />
            <MegamiNavBar />
            <ProductView product={product} />
        </>
    )
}


export default ProductPage

