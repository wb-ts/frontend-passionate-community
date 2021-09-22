import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body)
  res.status(200).json({ text: 'Received order  ' })
}