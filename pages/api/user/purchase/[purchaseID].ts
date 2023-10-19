import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

import { getToken } from "next-auth/jwt";
import { ICartProduct } from '@/interfaces/cart';
import { IPurchaseData } from '@/interfaces/purchase';

async function GetPurchases(req: NextApiRequest, res: NextApiResponse) {
    const token = getToken({ req })
    if (!token) {
        res.status(401).json({ message: "You must be logged in" })
        return
    }

    const prisma = new PrismaClient()
    const { purchaseID } = req.query

    async function query() {
        return prisma.cart.findMany({
            where: {
                id: parseInt(purchaseID as string),
            },
            select: {
                products: {
                    select: {
                        product: {
                            select: {
                                id: true,
                                price: true,
                                name: true,
                            }
                        },
                        quantity: true
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
            const purchaseProducts: ICartProduct[] = []
            for (let purchaseProduct of purchaseResult.products) {
                purchaseProducts.push({
                    productID: purchaseProduct.product.id,
                    price: purchaseProduct.product.price.toNumber(),
                    quantity: purchaseProduct.quantity,
                    title: purchaseProduct.product.name,
                })
            }
            const purchase = {
                products: purchaseProducts,
                date: purchaseResult.purchaseAt,
                id: purchaseResult.id
            } as IPurchaseData

            res.status(200).json(purchase)
        })
        .catch(async err => {
            await prisma.$disconnect()
            return res.status(500).end()
        })
}

export default GetPurchases
