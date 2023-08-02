import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, product } from '@prisma/client'
import { CardItemProps } from "@/components/views/CardView";
import { GetProductPictureURL } from "@/components/views/ProductView";

function GetLatestProducts(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()
    const { query } = req.query
    console.log(query)

    async function doQuery() {
        return prisma.product.findMany({
            where: {
                name: {
                    contains: `${query}`,
                    mode: 'insensitive'
                }
            },
            take: 10
        })
    }

    if (!query) {
        res.status(400)
        return
    }

    doQuery()
        .then(async products => {
            await prisma.$disconnect()
            console.log(products)
            res.status(200).json(products.map(value => {
                const formattedValue: CardItemProps = {
                    id: value.id,
                    image: GetProductPictureURL(value.id, 0),
                    price: value.price.toNumber(),
                    title: value.name,
                    rarity: value.rarity,
                    colors: value.colors,
                }
                return formattedValue
            }))
            res.end()
        })
        .catch(async error => {
            await prisma.$disconnect()
            console.error(error)
            res.status(500).json([])
            res.end()
        })
}

export default GetLatestProducts
