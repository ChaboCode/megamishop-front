import Header from "@/components/checkout/Header";
import MegamiHead from "@/components/MegamiHead";

function Checkout() {
    return (
        <>
            <MegamiHead />
            <Header />
            <div style={{ margin: '150px' }}>
                Para terminar tu compra, deposita a la siguiente cuenta: <br />
                BANORTE 555 555 5 55 55<br /><br />
                Una vez realizado el dep&oacute;sito, env&iacute;a el comprobante al siguiente correo:<br />
                megami.compras@protonmail.com

            </div>
        </>
    )
}

export default Checkout
