import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { CardItemProps } from "@/components/views/CardView";
import { GetProductPictureURL } from "@/components/views/ProductView";

function GetLatestProducts(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()
    const { quantity } = req.query

    async function query() {
        return prisma.product.findMany({
            orderBy: {
                id: 'desc'
            },
            take: parseInt(quantity as string)
        });
    }

    query()
        .then(async products => {
            await prisma.$disconnect()
            res.status(200).json(products.map(value => {
                const formattedValue: CardItemProps = {
                    id: value.id,
                    image: GetProductPictureURL(value.id, 0),
                    price: value.price.toNumber(),
                    title: value.name
                }
                return formattedValue
            }))
            res.end()
        })
        .catch(async error => {
            await prisma.$disconnect()
            res.status(500).json([])
            res.end()
        })
}

export default GetLatestProducts
