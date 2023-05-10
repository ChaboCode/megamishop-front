import MegamiHead from "@/components/MegamiHead";
import MegamiNavBar from "@/components/MegamiNavBar"
import { useRouter } from "next/router";
import ProductCardHelper from "@/components/helper/ProductCard";
import {PremadeProductList} from "@/components/checkout/ProductList";


function AddItemToCart() {
    const router = useRouter()
    const { productID } = router.query

    const item = <ProductCardHelper ids={[parseInt(productID as string)]}/>

    return (
        <>
            <MegamiHead />
            <MegamiNavBar />
            <PremadeProductList list={item} />
        </>
    )
}

export default AddItemToCart
