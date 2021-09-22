import { NextApiHandler } from 'next'
import Filter from 'bad-words'
import { query } from '@/lib/db'

const filter = new Filter()

const handler: NextApiHandler = async (req, res) => {
  const {
    userId,
    highlightedText,
    contentId,
    contentTitle,
    contentImgSrc,
    contentSlug,
    notes,
    startKey,
    endKey,
    startOffset,
    endOffset,
    startTextIndex,
    endTextIndex,
  } = req.body

  try {
    if (
      !userId ||
      !highlightedText ||
      !contentId ||
      !contentTitle ||
      !contentSlug ||
      !startKey ||
      !endKey ||
      !Number.isInteger(startOffset) ||
      !Number.isInteger(endOffset)
    ) {
      return res.status(400).json({
        message:
          '`userId`, `highlightedText`, `contentId`, `contentTitle`, `contentSlug`, `startKey`, `endKey`, `startOffset`, and `endOffset` are all required',
      })
    }

    const firstResult = await query(
      `
      INSERT INTO annotations (userId, updatedAt, highlightedText, contentId, contentTitle, contentImageSrc, contentSlug, startKey, endKey, startOffset, endOffset, startTextIndex, endTextIndex)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        new Date(),
        filter.clean(highlightedText),
        filter.clean(contentId),
        filter.clean(contentTitle),
        contentImgSrc ? filter.clean(contentImgSrc) : '',
        filter.clean(contentSlug),
        startKey,
        endKey,
        startOffset,
        endOffset,
        startTextIndex,
        endTextIndex,
      ]
    )

    if (notes) {
      const secondResult = await query(
        `
        INSERT INTO notes (notes, annotationId)
        VALUES (?, ?)
        `,
        [filter.clean(notes), firstResult['insertId']]
      )
      res.json(secondResult)
    } else {
      res.json(firstResult)
    }
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
