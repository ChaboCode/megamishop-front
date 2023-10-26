import { NextApiRequest, NextApiResponse } from "next";

import { getServerSession } from "next-auth";
import authOptions from "@/pages/api/auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

async function DeleteItemFromCart(req: NextApiRequest, res: NextApiResponse) {
    const { productID } = req.query

    const prisma = new PrismaClient();
    const session = await getServerSession(req, res, authOptions)
    if (!session) {
        res.status(401).json({ message: "You must be logged in" })
        return
    }
    const uid = (await getSession({ req: req }))?.user.id


    // +id! ===> convert string 2 number

    async function query() {
        const id = await prisma.cart_product.findMany({
            where: {
                productID: +productID!,
                cart: {
                    uid: uid
                }
            },
            select: {
                id: true
            }
        })
        await prisma.cart_product.delete({
            where: {
                id: +id[0].id!
            }
        })
    }

    query()
        .then(async () => {
            await prisma.$disconnect()
            res.status(200).json({
                success: true
            } as ServerResponse)
        })
        .catch(async err => {
            await prisma.$disconnect()
            console.log(err)
            res.status(500).json({
                success: false
            } as ServerResponse)
        })
        .finally(() => {
            res.end()
        })

}

export default DeleteItemFromCart