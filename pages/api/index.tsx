import type { NextApiRequest, NextApiResponse } from 'next'

export default function IndexHandler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: 'Jhon Doe' })
}
