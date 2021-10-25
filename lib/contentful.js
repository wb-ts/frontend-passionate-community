const contentful = require('contentful')

export const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW
    ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
  host: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW
    ? 'preview.contentful.com'
    : 'cdn.contentful.com',
})

export const fetchProductPricesByProductNumbers = (productNumbers) =>
  client.getEntries({
    content_type: 'bookVersion',
    'fields.productNumber[in]': productNumbers?.toString(),
  })
