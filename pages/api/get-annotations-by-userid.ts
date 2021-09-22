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
      SELECT annotations.id, annotations.contentId, annotations.contentImageSrc, 
      annotations.contentSlug, annotations.contentTitle, annotations.updatedAt,
      COUNT(annotations.id) as totalCount, COUNT(notes.id) as notesCount
      FROM annotations
      LEFT JOIN notes
      ON annotations.id = notes.annotationId
      WHERE annotations.userId = ?
      AND annotations.deletedAt IS NULL
      GROUP BY annotations.contentId
      ORDER BY id DESC
    `,
      userId
    )

    res.json(results)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
