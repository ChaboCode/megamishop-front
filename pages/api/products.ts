import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

function GetProducts(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient()

  async function query() {
    const data = await prisma.test.findMany()
    return data
  }

  query()
    .then(async result => {
      await prisma.$disconnect()
      console.log(result)
      res.status(200).json(result)
    })
    .catch(async e => {
      console.error(e)
      res.status(500)
      await prisma.$disconnect()
      process.exit(1)
    })
}

export default GetProducts

