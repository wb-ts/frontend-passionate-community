import { constSnipcart } from '../../const'

/**
 * Utility function to return a product from Snipcart for a given id
 * https://docs.snipcart.com/v3/api-reference/products
 *
 * @param {string} id
 * @return {object}
 */
const fetchProduct = async (id) => {
  const req = await fetch(constSnipcart.API_BASE_URL + '/products/' + id, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${Buffer.from(
        process.env.NEXT_PUBLIC_SECRET_SNIPCART_API_KEY + ':',
        'binary'
      ).toString('base64')}`,
      Accept: 'application/json',
    },
  })
  return await req.json()
}

export default fetchProduct
