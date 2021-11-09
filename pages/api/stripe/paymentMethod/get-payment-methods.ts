import { NextApiHandler } from 'next'

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
})

const handler: NextApiHandler = async (req, res) => {
  const customerId: string = req.query.customerId as string
  try {
    const paymentMethods = await stripe.customers.listPaymentMethods(
      customerId,
      {type: 'card'}
    );

  res.json(paymentMethods)
  
  } catch (err) {
    res.status(500).json({message: err.message })
  }
}
  export default handler