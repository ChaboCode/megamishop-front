import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

import { IPurchase } from "@/interfaces/purchase";
import { getToken, JWT } from "next-auth/jwt";


async function GetPurchases(req: NextApiRequest, res: NextApiResponse) {
    // const session = await getServerSession(req, res, authOptions) as Session
    const token = await getToken({ req })
    const { uid } = token as JWT

    // console.log(JSON.stringify(session, null, 2))
    if (!token) {
        res.status(401).json({ message: "You must be logged in" })
        return
    }
    const prisma = new PrismaClient()
    const { page } = req.query

    async function query() {
        return prisma.cart.findMany({
            where: {
                uid: uid as string,
                isPurchased: true,
            },
            select: {
                id: true,
                purchaseAt: true,
            },
            take: 10,
            skip: 10 * (parseInt(page as string) - 1)
        })
    }

    query()
        .then(async result => {
            await prisma.$disconnect()
            if (result.length == 0) {
                res.status(200).json({ empty: true })
                res.end()
                return
            }
            res.status(200).json(result.map(p => {
                return {
                    id: p.id,
                    date: p.purchaseAt as Date,
                } as IPurchase
            }))
        })
        .catch(async err => {
            await prisma.$disconnect()
            res.status(500).end()
            console.log(err)
        })
}

export default GetPurchases
