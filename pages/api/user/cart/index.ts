import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";
import { ICart, ICartProduct } from "@/interfaces/cart";

function GetUserCart(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()
    const { uid } = req.query

    async function query() {
        const cartQuery = await prisma.cart.findMany({
            where: {
                uid: uid as string,
                isPurchased: false
            },
            // Although this section looks like shit, it's fairly simple.
            // The cart has product entries, from which is extracted the actual product entry,
            // with the product data. It should be a better way of writing this, but I'm
            // tired asf, and I'm only wondering when this will get functional
            select: {
                id: true,
                products: {
                }
            },
            take: 1,
        })

        if (cartQuery.length < 1) {
            return {
                success: false
            } as ServerResponse

        }

        const products = await prisma.cart_product.findMany({
            where: {
                cartID: cartQuery[0].id,
            },
            select: {
                id: true,
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        // TODO: Implement product discounts
                    }
                },
                quantity: true
            },
            orderBy: {
                addedDate: 'desc'
            }
        })

        const total = products.reduce((total, cartProduct) => {
            const { price } = cartProduct.product
            const { quantity } = cartProduct
            return total + price.toNumber() * quantity
        }, 0)

        const cart: ICart = {
            products: products.map(cartProduct => {
                const product: ICartProduct = {
                    cartProductId: cartProduct.id,
                    productID: cartProduct.product.id,
                    title: cartProduct.product.name,
                    price: cartProduct.product.price.toNumber(),
                    quantity: cartProduct.quantity,
                }
                return product
            }),
            total: total,
            success: true,
        }

        return cart
    }


    query()
        .then(async cart => {
            await prisma.$disconnect()
            res.status(200).json(cart)
            res.end()
        })
        .catch(async err => {
            await prisma.$disconnect()
            res.status(500)
            console.error(err)
            res.end()
        })
}

export default GetUserCart
