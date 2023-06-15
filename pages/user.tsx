import Header from "@/components/checkout/Header"
import Purchases from "@/components/user/Purchases"
import { GetServerSideProps, GetServerSidePropsContext } from "next"
import { getServerSession } from "next-auth"
import Nextauth from "./api/auth/[...nextauth]"

function UserPage() {
    return (
        <>
            <Header subtitle={`Configuración de usuario`} />
            <Purchases />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const session = await getServerSession(context.req, context.res, Nextauth)

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }

    return {
        props: { session },
    }
}

export default UserPage
