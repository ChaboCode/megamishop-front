import { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient } from '@prisma/client'

export default function scratches(req: NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()
    res.status(200).json([typeof prisma.products])
}
