import type {NextApiRequest, NextApiResponse} from 'next'
import {PrismaClient} from "@prisma/client"

function GetCartTotal(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()
    const {uid} = req.query

    async function query() {
        const cartProducts = await prisma.cart.findMany({
            where: {
                uid: uid as string,
                isPurchased: false
            },
            select: {
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
        })
        return cartProducts.reduce((total, cart) => {
            return total + cart.products.reduce((total, cartProduct) => {
                const { price } = cartProduct.product
                const { quantity } = cartProduct
                return total + price.toNumber() * quantity
            }, 0)
        }, 0)
    }

    query()
        .then(async total => {
            await prisma.$disconnect()
            res.status(200).json({total: total})
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
