import { NextApiHandler } from 'next'
import { query } from '../../lib/db'

const handler: NextApiHandler = async (req, res) => {
  const {
    emailAddress,
    context,
  } = req.body

  try {
    if (!emailAddress) {
      return res.status(400).json({ message: 'no email address' })
    }
    const result = await query(
      `INSERT INTO EmailCapture (EmailAddress, Context) VALUES (?, ?)`,
      [emailAddress, context]
    )

    res.json(result)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}

export default handler
