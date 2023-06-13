import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client"
import { CartData } from "@/components/checkout/CartPrice";

import { getServerSession } from "next-auth";
import authOptions from "@/pages/api/auth/[...nextauth]";

async function GetCartTotal(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).json({ message: "You must be logged in" })
        return
    }

    console.log(session)

    async function query() {
        const cartProducts = await prisma.cart.findMany({
            where: {
                // uid: uid as string,
                isPurchased: false
            },
            select: {
                id: true,
                isOneTime: true,
                products: {
                    select: {
                        product: {
                            select: {
                                price: true
                            }
                        },
                        quantity: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        const total = cartProducts.reduce((total, cart) => {
            return total + cart.products.reduce((total, cartProduct) => {
                const { price } = cartProduct.product
                const { quantity } = cartProduct
                return total + price.toNumber() * quantity
            }, 0)
        }, 0)

        return {
            total: total,
            id: cartProducts[0].id,
            isOneTime: cartProducts[0].isOneTime
        } as CartData
    }

    query()
        .then(async result => {
            await prisma.$disconnect()
            res.status(200).json(result)
        })
        .catch(async err => {
            await prisma.$disconnect()
            console.log(err)
            res.status(500)
        })
        .finally(() => {
            res.end()
        })
}

export default GetCartTotal
