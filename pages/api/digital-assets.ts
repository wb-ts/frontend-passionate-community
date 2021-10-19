import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { userId } = req.query
  try {
    if (!userId) {
      return res.status(400).json({ message: '`userId` required' })
    }
    const results = await query(
    `
    SELECT * FROM MEMBER_BOOK_DOWNLOAD_INFO WHERE SHIP_MASTER_CUSTOMER_ID = ? 
    ORDER BY ORDER_DATE DESC
    `,
      userId
    )
       res.json(results)

  } catch(err) {
    //console.log(err)
      res.status(500).json({ message: err.message})

  }
}
  export default handler
