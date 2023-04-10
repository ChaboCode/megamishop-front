import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

function LoadProductById(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()
    const { productID } = req.query

    async function query() {
        // TODO: Create table `products`
        const product = await prisma.test.findMany({
            where: { id: parseInt(productID as string) },
        })
        return product
    }

    query()
        .then(async product => {
            await prisma.$disconnect()
            console.log(product)
            res.status(200).json(product)
        })
        .catch(async err => {
            console.error(err)
            await prisma.$disconnect()
            res.status(500)
        })

}

export default LoadProductById

