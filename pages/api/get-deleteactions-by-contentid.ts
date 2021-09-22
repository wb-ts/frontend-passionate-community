import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { userId, contentId } = req.query

  try {
    if (!userId || !contentId) {
      return res
        .status(400)
        .json({ message: '`userId`, and `contentId` are both required' })
    }

    const results = await query(
      `
      SELECT *
      FROM delete_actions
      WHERE userId = ?
      AND contentId = '${contentId}'
      `,
      userId
    )

    res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler

// AND annotations.deletedAt IS NULL
