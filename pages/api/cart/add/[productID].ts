import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from "@prisma/client";
import cartUncheckedCreateInput = Prisma.cartUncheckedCreateInput;
import cart_productUncheckedCreateInput = Prisma.cart_productUncheckedCreateInput;

function AddProductToCart(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const { productID } = req.query
    const { uid } = req.body
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

        const availableCartIds = carts.filter(cart => {
            if (!cart.isPurchased) {
                return cart.id
            }
        })

        let availableCartId: number
        if (availableCartIds.length == 0) {
            const newCart = await prisma.cart.create({
                data: {
                    uid: uid as string,
                    products: {},
                } as cartUncheckedCreateInput,
                select: {
                    id: true
                }
            })
            availableCartId = newCart.id
        } else {
            availableCartId = availableCartIds[0].id
        }

        // Step 2. If the cart already contains the item, update the item count
        const product = await prisma.cart_product.findMany({
            where: {
                cartID: availableCartId,
                productID: parseInt(productID as string),
            },
            select: {
                id: true,
                quantity: true
            }
        })
        if (product.length > 0) {
            const { id, quantity } = product[0]
            await prisma.cart_product.update({
                where: {
                    id: id
                },
                data: {
                    quantity: quantity + 1
                }
            })
            return
        }


        // Step 3. Create a cart product entry with the selected product and the previous cart
        await prisma.cart_product.create({
            data: {
                cartID: availableCartId,
                quantity: 1,
                productID: parseInt(productID as string)
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

export default AddProductToCart
