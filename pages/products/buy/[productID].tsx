import { useSession, signIn } from "next-auth/react"
import Header from "@/components/checkout/header"
import styles from "@/styles/Purchase.module.css"

function BuyProduct() {
    const { data: session } = useSession()

    let content = (
        <button onClick={e => signIn()}>
            Login
        </button>
    )

    if (session != undefined) {
        content = <></>
    }


    return (
        <>
            <Header />
        </>
    )
}

export default BuyProduct