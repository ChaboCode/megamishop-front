import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

function IndexHandler(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()

    async function queries() {
        const allData = await prisma.test.findMany()
        console.log(allData)
    }

    queries()
        .then(async () => {
            await prisma.$disconnect()
            res.status(200).json({ name: 'Jhon Doe' })
        })
        .catch(async e => {
            console.error(e)
            res.status(500)
            await prisma.$disconnect()
            process.exit(1)
        })
}

export default IndexHandler 
