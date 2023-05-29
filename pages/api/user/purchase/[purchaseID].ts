import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

import {getServerSession} from "next-auth";
import authOptions from "@/pages/api/auth/[...nextauth]";

async function GetPurchases(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).json({message: "You must be logged in"})
        return
    }

    const prisma = new PrismaClient()
    const {purchaseID} = req.query

    async function query() {
        return prisma.cart.findMany({
            where: {
                id: parseInt(purchaseID as string),
            },
            select: {
                products: {
                    select: {
                        productID: true
                    }
                },
                purchaseAt: true,
                id: true
            }
        });
    }

    query()
        .then(async result => {
            await prisma.$disconnect()

            const purchaseResult = result[0]
            const purchase = {
                productIDs: purchaseResult.products,
                date: purchaseResult.purchaseAt,
                id: purchaseResult.id
            }

            res.status(200).json(purchase)
        })
        .catch(async err => {
            await prisma.$disconnect()
            res.status(500).end()
        })
}

export default GetPurchases
