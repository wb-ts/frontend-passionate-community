import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * This api endpoint processes requests from Snipcart. All Snipcart orders will send
 * a request to this endpoint to validate the purchase. The url contains the product Id and
 * an encrypted price as the parameter. Snipcart requires a json in return to validate the information
 * it received.
 *
 * @param {NextApiRequest} request
 * @param {NextApiResponse} response
 */
export default (req: NextApiRequest, res: NextApiResponse) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_SNIPCART_ORDER_VALIDATION_BASE_URL || ''
  const {vKey, item, guid, productType} = req.query
  let price = Buffer.from(
    vKey?.toString(),
    'base64'
  ).toString('binary')

  // Prevent $0 workshops from being sold
  price = (productType === 'workshop' && price === '0') ? '99' : price

  const validationJson = {
    "id": item[0],
    "price": price,
    "dimensions": {
      "weight": price
    },
    "url": `${baseUrl}/api/order-validations/${item[0]}?vKey=${vKey}&productType=${productType}`,
    "fileGuid": (guid) ? guid : ''
  }

  res.status(200).json(validationJson)

}
