import { NextApiHandler } from 'next'

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
})

const handler: NextApiHandler = async (req, res) => {
  try {
    const paymentMethod = await stripe.paymentMethods.attach(
      req.body.paymentMethodId,
      {customer:  req.body.customerId}
    );

  res.json(paymentMethod)

  } catch (err) {
    res.status(500).json({message: err.message })
  }
}
  export default handler
