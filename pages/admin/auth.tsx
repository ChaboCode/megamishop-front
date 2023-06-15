import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect } from "react"

function Auth({ children }: WithChildren) {
    const router = useRouter()
    const { data: session } = useSession()
    const admins = ["cl3swbdw0000cmi5rwj0zjbd"]

    useEffect(() => {
        if (!session) {
            signIn()
        }

        if (session && session?.user.id in admins) {
            router.push("/404")
        }
    }, [session])

    return <>{children}</>
}

export default Auth
