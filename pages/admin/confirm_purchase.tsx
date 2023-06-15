import { useState } from "react"

function ConfirmPurchase() {
    const [purchaseID, setID] = useState("")
    const [status, setStatus] = useState("Sin confirmar compra")

    function confirm() {
        fetch("/api/admin/confirm_purchase", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                purchaseID: purchaseID,
            }),
        })
            .then((res) => { console.log(res) })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <input
                placeholder="ID de compra"
                value={purchaseID}
                onChange={(e) => setID(e.target.value)}
            /><br />
            <button onClick={() => confirm()}>Confirmar compra</button>
        </>
    )
}

export default ConfirmPurchase
