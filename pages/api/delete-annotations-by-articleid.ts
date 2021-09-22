import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { contentId } = req.query

  const { userId } = req.body

  try {
    if (!contentId || !userId) {
      return res
        .status(400)
        .json({ message: '`contentId` and `userId` are both required' })
    }

    // soft delete
    // const results = await query(
    //   `
    //   UPDATE annotations
    //   SET deletedAt = ?
    //   WHERE contentId = ?
    //   AND userId = ?
    //   `,
    //   [new Date(), contentId, userId]
    // )

    // hard delete
    const results = await query(
      `
      DELETE FROM annotations
      WHERE contentId = ?
      AND userId = ?
      `,
      [contentId, userId]
    )

    res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
