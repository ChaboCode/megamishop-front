import { signOut, useSession } from 'next-auth/react'

export default function AdminHome() {
		const { data: session } = useSession()
		const user = session?.user
		console.log(user)
}
