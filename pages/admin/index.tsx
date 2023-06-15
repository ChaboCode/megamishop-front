import { GetServerSideProps, GetServerSidePropsContext } from "next"
import Nextauth from "../api/auth/[...nextauth]"
import { Session, getServerSession } from "next-auth"
import Link from "next/link"

function AdminHome() {
    return (
        <>
            <Link href={"/"}>Home</Link><br/>
            <Link href={"/admin/confirm_purchase"}>Confirm purchase</Link>
            <Link href={"/admin/add_product"}>Add product</Link>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const session = (await getServerSession(
        context.req,
        context.res,
        Nextauth
    )) as Session
    const admins = ["thebestergamergd@gmail.com"]

    if (!session || !admins.includes(session?.user.email as string)) {
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

export default AdminHome
