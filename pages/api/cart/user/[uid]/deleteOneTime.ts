import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client"

function DeleteOneTimeCart(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()
    const { uid } = req.query

    async function query() {
        const oneTimeCart = await prisma.cart.findMany({
            where: {
                uid: uid as string,
                isOneTime: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true
            },
            take: 1
        })

        await prisma.cart.delete({
            where: {
                id: oneTimeCart[0].id
            }
        })
    }

    query()
        .then(async result => {
            await prisma.$disconnect()
            res.status(200).end()
            console.log("Deleted one time cart")
        })
        .catch(async err => {
            await prisma.$disconnect()
            res.status(500).end()
            console.log(err)
        })
}

export default DeleteOneTimeCart
