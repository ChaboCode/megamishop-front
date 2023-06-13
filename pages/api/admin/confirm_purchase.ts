import type { NextApiRequest, NextApiResponse } from "next"
import { Prisma, PrismaClient } from "@prisma/client"
import AdminAuth from "./util/auth"

async function ConfirmPurchase(req: NextApiRequest, res: NextApiResponse) {
    if (!AdminAuth(req)) {
        res.status(401).end()
        return
    }

    const { purchaseID } = req.body

    if (!purchaseID) {
        res.status(400).end()
        return
    }


    const prisma = new PrismaClient()
    try {
        await prisma.cart.updateMany({
            data: {
                isPurchased: true,
                purchaseAt: new Date(),
            },
            where: {
                id: parseInt(purchaseID),
            },
            
        })
    } catch (err) {
        await prisma.$disconnect()
        console.log(err)
        res.status(500).json(err)
        res.end()
        return
    }
    await prisma.$disconnect()
    res.status(200).write(`Purchase ${purchaseID} confirmed successfully`)
    res.end()
    return
}

export default ConfirmPurchase
