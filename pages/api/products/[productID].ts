import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

import { IProductState } from "@/interfaces/products";

function LoadProductById(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()
    const { productID } = req.query

    async function query() {
        return prisma.product.findMany({
            where: { id: parseInt(productID as string) },
        })
    }

    query()
        .then(async products => {
            await prisma.$disconnect()

            if (products.length > 0) {
                const product: IProductState = {
                    id: products[0].id,
                    name: products[0].name as string,
                    price: products[0].price.toNumber(),
                    stock: products[0].stock as number,
                    images: products[0].images,
                    desc: products[0].description
                }
                res.status(200).json(product)
            }

            res.status(200).json(null)
        })
        .catch(async err => {
            console.error(err)
            await prisma.$disconnect()
            res.status(500)
        })
}

export default LoadProductById

