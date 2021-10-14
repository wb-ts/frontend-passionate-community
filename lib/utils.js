import constSnipcart from '@/const/snipcart'

export const getPianoClient = () =>
  typeof window !== 'undefined' && typeof window.tp !== 'undefined'
    ? window.tp
    : undefined

export const getSnipcartClient = () =>
  typeof window !== 'undefined' && typeof window.Snipcart !== 'undefined'
    ? window.Snipcart
    : undefined

// util function to get the path name
export const pathName =
  typeof window !== 'undefined' && window.location.pathname

// util function to get the protocol
export const protocol =
  typeof window !== 'undefined' && window.location.protocol

// util function to get the protocol
export const port = typeof window !== 'undefined' && window.location.port

// util function to get the host name
export const hostname =
  typeof window !== 'undefined' && window.location.hostname

// util function to get the host name for setting a cookie
export const hostnameForCookie =
  typeof window !== 'undefined' &&
  window.location.hostname.includes('.ascd.org')
    ? '.ascd.org'
    : ''

// util function to get the protocol, hostname and port
export const baseUrl = port
  ? `${protocol}//${hostname}:${port}`
  : `${protocol}//${hostname}`

/**
 * This function will return the url needed to allow Snipcart to validate products
 * that are purchased on our site.
 *
 * @param {String} productId
 * @param {Number} productPrice
 * @param {String} digitalFileGuid
 * @returns {String}
 */
export const encodeSnipcartOrderValidationUrl = (
  productId,
  productPrice,
  digitalFileGuid
) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_SNIPCART_ORDER_VALIDATION_BASE_URL || ''

  const price = productPrice ? productPrice.toString() : '0'

  return encodeURI(
    `${baseUrl}/api/order-validations/${productId}?vKey=${Buffer.from(
      price,
      'binary'
    ).toString('base64')}${digitalFileGuid ? '&guid=' + digitalFileGuid : ''}`
  )
}
//util function to determine if current datetime has passed a given date string
const becomeAvailable = (availableDateString) => {
  const availableDate = Date.parse(availableDateString);
  return !isNaN(availableDate) && !(availableDate - new Date() > 0);
}
//util function to return caption label for Snipcart button for a given date string
export const getCartButtonCaptionLabel = (availableDateString) => {
  return becomeAvailable(availableDateString) ? constSnipcart.BTN_LABEL_ADD : constSnipcart.BTN_LABEL_PREORDER;
}
//util function to return a product from Snipcart for a given id
//https://docs.snipcart.com/v3/api-reference/authentication
export const getProductFromSnipcart = async (id) => {
  const req = await fetch(constSnipcart.API_BASE_URL + '/products/' + id, {
    method: 'GET', 
    headers: {
      'Authorization': `Basic ${Buffer.from(process.env.NEXT_PUBLIC_SECRET_SNIPCART_API_KEY + ':', 'binary').toString('base64')}`,
      'Accept': 'application/json'
    }
  });
  return await req.json();
}

//function created based on the blog at
//https://www.codespot.org/javascript-email-validation/
export const validateEmail = (emailAddress) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailAddress && re.test(emailAddress.toLowerCase())
}