import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const admins = [
    "cli3swbdw0000cmi5rwj0zjbd"
]

async function AdminAuth(req: NextApiRequest) {
    const token = await getToken({ req })
    if (token && token.uid in admins) {
        return true
    }
    return false
}

export default AdminAuth
