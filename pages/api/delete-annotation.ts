import { NextApiHandler } from 'next'
import { query } from '@/lib/db'

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query
  const { userId, contentId } = req.body
  try {
    if (!id || !userId || !contentId) {
      return res
        .status(400)
        .json({ message: '`id`, `userId`, and `contentId` are all required' })
    }
    if (typeof parseInt(id.toString()) !== 'number') {
      return res.status(400).json({ message: '`id` must be a number' })
    }
    const results = await query(
      `
      UPDATE annotations
      SET deletedAt = ?
      WHERE id = ?
      AND userId = ?
      `,
      [new Date(), id, userId]
    )

    const lastAnnotation = await query(
      `
      SELECT *
      FROM annotations
      WHERE userId = ?
      AND contentId = '${contentId}'
      ORDER BY id DESC LIMIT 1
      `,
      userId
    )

    const createDeleteAction = await query(
      `
        INSERT INTO delete_actions (userId, contentId, precedingAnnotationId, deletedAnnotationId)
        VALUES (?, ?, ?, ?)
        `,
      [userId, contentId, lastAnnotation[0]['id'], id]
    )

    res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
