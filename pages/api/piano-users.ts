import type { NextApiRequest, NextApiResponse } from 'next'
import { decrypt } from '@/lib/decrypt-piano'



export default (req: NextApiRequest, res: NextApiResponse) => {
  const GET_PIANO_USER_API = '/publisher/user/get'
  console.log('Piano Users API')
  const result = decrypt(process.env.NEXT_PUBLIC_PIANO_PRIVATE_KEY, req.query.data?.toString())
  console.log(result)
  res.status(200).json({status: 'success'})
}