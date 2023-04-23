import type { NextApiRequest, NextApiResponse } from 'next'
import {PrismaClient, Prisma, cart} from "@prisma/client";

function AddProductToCart(req: NextApiRequest, res: NextApiResponse) {
    const {method} = req
    const {productID, uid} = req.query
    const prisma = new PrismaClient()

    if (method != 'POST') {
        res.status(405).end()
        return
    }

    async function query() {
        // Step 1. Find an active cart. If not, create a new one
        const carts = await prisma.cart.findMany({
            where: {
                uid: uid as string
            },
            orderBy: {
                createdAt: 'desc'
            },
        })

        const availableCartId = carts.filter(cart => {
            if(!cart.isPurchased) {
                return cart.id
            }
        })
        console.log(availableCartId)

        if (availableCartId.length == 0) {
            prisma.cart.create({
                data: {
                    uid: uid as string,
                    products: {},

                },
                select: {

                }
            })
        }
        // Step 2. Create a cart product entry with the selected product and the previous cart
    }

    query()
        .then(result => {
            res.status(200).end()
        })
        .catch(err => {
            res.status(500).end()
        })
        .finally(async () => {
            await prisma.$disconnect()
        })
}

export default AddProductToCart
