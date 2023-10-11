import styles from "@/styles/User.module.css"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { IPurchase, IPurchaseData } from "@/interfaces/purchase"
import ProductCard from "../checkout/ProductCard"
import { GetProductPictureURL } from "../views/ProductView"

function UserPurchases() {
    const { data: session } = useSession()
    const [purchases, setPurchases] = useState<JSX.Element | JSX.Element[]>(
        <>Loading</>
    ) // List of purchases
    const [purchase, setPurchase] = useState<JSX.Element | JSX.Element[]>(
        <>Loading</>
    ) // List of products in selected purchase
    const [purchaseSelection, setSelection] = useState(0)
    const [page, setPage] = useState(1)

    useEffect(() => {
        fetch(`/api/user/purchases/${page}`).then(async (response) => {
            const fetchPurchases = (await response.json()) as IPurchase[]

            console.info(fetchPurchases)

            if (fetchPurchases.length == 0) {
                setSelection(0)
                setPurchases(
                    <button className={styles["purchaseButton"]}>
                        <span className={styles["date"]}>
                            Aún no hay compras unu
                        </span>
                    </button>
                )
                setPurchase(<></>)
                return
            }

            setPurchases(
                fetchPurchases.map((p: IPurchase, index: number) => {
                    const date = new Date(p.date.toString())
                    return (
                        <button key={index}
                            className={styles["purchaseButton"]}
                            onClick={(e) => selectPurchase(index)}>
                            <span className={styles["date"]}>{date.toLocaleDateString('es-MX')}</span>
                        </button>
                    )
                })
            )



            // Selected purchase
            fetch(`/api/user/purchase/${fetchPurchases[purchaseSelection].id}`).then(
                async (response) => {
                    const purchaseData =
                        (await response.json()) as IPurchaseData
                    setPurchase(
                        purchaseData.products.map((product) => {
                            const { price, id, quantity, title, discount } =
                                product
                            return (
                                <ProductCard
                                    key={id}
                                    price={price}
                                    productID={id}
                                    quantity={quantity}
                                    title={title}
                                    discount={discount}
                                    picture={GetProductPictureURL(id, 0)}
                                />
                            )
                        })
                    )
                }
            )
        })
    }, [session, page, purchaseSelection])

    function selectPurchase(id: number) {
        setPurchase(<>Loading...</>)
        setSelection(id)
    }

    return (
        <div className={styles["container"]}>
            <div className={styles["card"]}>
                <div className={styles["purchases"]}>
                    {purchases}
                </div>
                <div className={styles["divider"]} />
                <div className={styles["purchase"]}>
                    <div className={styles["items"]}>
                        {purchase}
                    </div>
                    <span className={styles["total"]}>Total: {}</span>
                </div>
            </div>
        </div>
    )
}

export default UserPurchases
