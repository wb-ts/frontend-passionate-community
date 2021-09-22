import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

/**
 * Returns all entries including those soft-deleted ones which will be handled accordingly
 * by the front-end (ie setting display to none) so as not to throw off the indices of the
 * succeeding records.
 */
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
      SELECT annotations.*, notes.notes
      FROM annotations
      LEFT JOIN notes
      ON annotations.id = notes.annotationId
      WHERE annotations.userId = ?
      AND annotations.contentId = '${contentId}'
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
