import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import authOptions from "@/pages/api/auth/[...nextauth]";
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

async function SetQuantity(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).json({ message: "You must be logged in" })
        res.end()
        return
    }
    const uid = (await getSession({ req: req }))?.user.id

    const prisma = new PrismaClient()
    const { cartProductID, quantity } = req.body
    const validProductID = await prisma.cart_product.findMany({
        where: {
            AND: {
                id: +cartProductID!,
                cart: {
                    uid: uid!,
                    isPurchased: false
                }
            },
        },
        select: {
            id: true,
            cartID: true,
        },
        take: 1
    })

    if(validProductID.length !== 1) {
        prisma.$disconnect
        res.status(400)
        res.end()
    }

    await prisma.cart_product.update({
        where: {
            id: validProductID[0].id
        },
        data: {
            quantity: +quantity!
        },

    }).catch(err => {
        console.log(err)
        res.status(500)
        res.end()
    })

    prisma.$disconnect()
    res.status(200)
    res.end()
}

export default SetQuantity
