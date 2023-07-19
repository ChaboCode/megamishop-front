import type { NextApiRequest, NextApiResponse } from "next"
import { Prisma, PrismaClient } from "@prisma/client"
import * as Minio from "minio"
import AdminAuth from "./util/auth"
import formidable from "formidable"
import { env } from "process"

interface IData {
    err: any
    fields?: any
    files?: any
}

async function AddProduct(req: NextApiRequest, res: NextApiResponse) {
    console.log('a')
    if (!AdminAuth(req)) {
        res.status(401).end()
        return
    }

    // Step 1. Parse the form
    const data = await new Promise((resolve, reject) => {
        const form = new formidable.Formidable()
        form.parse(req, (err, fields, files) => {
            if (err) reject({ err } as IData)
            resolve({ err, fields, files } as IData)
        })
    }) as IData

    if (data.err) {
        res.status(500)
        return 
    }

    const product = data.fields
    console.log(product)
    console.log('XD')



    // Step 2. Create the database entry

    // const product = req.body.product as INewProduct
    const { desc, price, name, stock, category } = product

    const prisma = new PrismaClient()
    try {
        // 1. Database info
        const newProduct = await prisma.product.create({
            data: {
                description: desc,
                images: 1,
                name: name,
                price: parseInt(price),
                stock: parseInt(stock),
                category: category,
            },
            select: {
                id: true,
            },
        })

        // 2. Image on server

        const minioClient = new Minio.Client({
            endPoint: (env.MINIO_ENDPOINT as string),
            useSSL: false,
            accessKey: env.MINIO_USER as string,
            secretKey: env.MINIO_SECRET as string,
        })

        const uploadStatus = await minioClient.fPutObject('web', `${newProduct.id}_0.png`, data.files?.image.filepath)
        

        await prisma.$disconnect()
        res.status(200).json({id: newProduct.id})
        res.end()
    } catch (err) {
        await prisma.$disconnect()
        console.log(err)
        res.status(500).json({error: err})
        res.end()
    }
}

export default AddProduct

export const config = {
  api: {
    bodyParser: false
  }
}
