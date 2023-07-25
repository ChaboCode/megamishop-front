import type { NextApiRequest, NextApiResponse } from "next"
import multer from "multer"
import * as Minio from "minio"
import AdminAuth from "../admin/util/auth"
import * as formidable from "formidable"
import { INewProduct } from "@/interfaces/products"
import { IncomingMessage } from "http"

async function MinioTest(req: NextApiRequest, res: NextApiResponse) {
    if (!AdminAuth(req)) {
        res.status(401).end()
        return
    }

    const data = await new Promise((resolve, reject) => {
        const form = new formidable.Formidable()
        form.parse(req as IncomingMessage, (err, fields, files) => {
            if (err) reject({ err })
            resolve({ err, fields, files })
        })
    }) as any

    console.log(data)

    const minioClient = new Minio.Client({
        endPoint: "localhost",
        port: 9000,
        useSSL: false,
        accessKey: "web",
        secretKey: "tulapias",
    })

    const upload = await minioClient.fPutObject('web', `test.jpg`, data.files.image.filepath)
    console.log(upload)

    res.send(200)
}

export default MinioTest

export const config = {
    api: {
        bodyParser: false
    }
}
