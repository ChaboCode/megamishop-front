import type {NextApiRequest, NextApiResponse} from 'next'
import {PrismaClient} from '@prisma/client'

import {IPurchase} from "@/interfaces/purchase";
import {getServerSession} from "next-auth";
import authOptions from "@/pages/api/auth/[...nextauth]";


async function GetPurchases(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).json({message: "You must be logged in"})
        return
    }
    const prisma = new PrismaClient()
    const { userID, page } = req.query

    async function query() {
        return prisma.cart.findMany({
            where: {
                user: {
                    id: userID as string
                },
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
                res.status(200).json([])
            }
            res.status(200).json(result.map(p => {
                return {
                    id: p.id,
                    date: p.purchaseAt?.toDateString(),
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
