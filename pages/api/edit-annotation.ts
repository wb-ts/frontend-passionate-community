import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '@/lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.query
  const { userId, notes } = req.body

  try {
    if (!id || !userId || !notes) {
      return res
        .status(400)
        .json({ message: '`id`, `userId`, and `notes` are all required' })
    }

    const selectResults = await query(
      `
      SELECT annotations.*, notes.notes
      FROM annotations
      LEFT JOIN notes
      ON annotations.id = notes.annotationId
      WHERE annotations.id = ?
      `,
      id
    )

    if (selectResults[0].notes) {
      const results = await query(
        `
        UPDATE notes
        LEFT JOIN annotations
        ON notes.annotationId = annotations.id
        SET notes.notes = ?,
        annotations.updatedAt = ?
        WHERE notes.annotationId = ?
        AND annotations.userId = ?
        AND annotations.deletedAt IS NULL
        `,
        [filter.clean(notes), new Date(), id, userId]
      )

      return res.json(results)
    } else {
      const results = await query(
        `
        INSERT INTO notes (notes, annotationId)
        VALUES (?, ?)
        `,
        [filter.clean(notes), id]
      )
      res.json(results)
    }
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
