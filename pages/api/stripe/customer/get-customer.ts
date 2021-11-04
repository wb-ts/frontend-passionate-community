import { NextApiHandler } from 'next'

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
})

const handler: NextApiHandler = async (req, res) => {
  const email: string = req.query.email as string;
  try {
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    })

  res.json(customers)

  } catch (err) {
    res.status(500).json({message: err.message })
  }
}
  export default handler
