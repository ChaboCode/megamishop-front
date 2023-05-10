import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, PrismaClient } from "@prisma/client";
import cartUncheckedCreateInput = Prisma.cartUncheckedCreateInput;
import cart_productUncheckedCreateInput = Prisma.cart_productUncheckedCreateInput;

function OneTimeCart(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { productID } = req.query
    const { uid } = JSON.parse(req.body)
    const prisma = new PrismaClient()

    if (method != 'POST') {
        res.status(405).end()
        return
    }

    async function query() {
        const cartID = await prisma.cart.create({
            data: {
                uid: uid as string,
                isOneTime: true,
            } as cartUncheckedCreateInput,
            select: {
                id: true
            }
        })

        await prisma.cart_product.create({
            data: {
                cartID: cartID.id,
                quantity: 1,
                productID: parseInt(productID as string),
            } as cart_productUncheckedCreateInput,
        })
    }

    query()
        .then(async () => {
            await prisma.$disconnect()
            res.status(200).end()
        })
        .catch(async err => {
            console.error(err)
            await prisma.$disconnect()
            res.status(500).end()
        })
}

export default OneTimeCart
