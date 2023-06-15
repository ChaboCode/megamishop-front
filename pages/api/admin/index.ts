import { NextApiRequest, NextApiResponse } from "next";

async function ConfirmPurchase(req: NextApiRequest, res: NextApiResponse) {
    res.json({ 'xd': true })
    res.end()
}

export default ConfirmPurchase