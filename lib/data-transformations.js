import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { PeopleOutline } from '@mui/icons-material'
import dateFormat from 'dateformat'
import _ from 'lodash'
import getProductInventory from '../components/Snipcart/SnipcartManager'
import { imageoptimization, options, constSnipcart } from '../const'
import paths from '../paths/path'
import {
  getCartButtonCaptionLabel,
  convertTimeToLocaleTimeWithDST,
} from './utils'

export const contentfulThumbnailToImageUrl = (thumbnailGraphql) =>
  thumbnailGraphql?.imageBynder
    ? `${
        thumbnailGraphql.imageBynder[0]?.src.startsWith('//')
          ? 'https:' + thumbnailGraphql.imageBynder[0]?.src
          : thumbnailGraphql.imageBynder[0]?.src
      }`
    : thumbnailGraphql?.imageContentful?.url
    ? `${
        thumbnailGraphql?.imageContentful?.url.startsWith('//')
          ? 'https:' + thumbnailGraphql?.imageContentful?.url
          : thumbnailGraphql?.imageContentful?.url
      }`
    : '/images/ASCDImageFiller.png'

export const contentfulThumbnailAPIToImageUrl = (image) =>
  image?.fields?.imageBynder
    ? `${
        image.fields.imageBynder[0]?.src.startsWith('//')
          ? 'https:' + image.fields.imageBynder[0]?.src
          : image.fields.imageBynder[0]?.src
      }`
    : image?.fields?.imageContentful?.fields?.file?.url
    ? `${
        image.fields.imageContentful.fields?.file.url.startsWith('//')
          ? 'https:' + image.fields.imageContentful.fields?.file.url
          : image.fields.imageContentful.fields?.file.url
      }`
    : '/images/ASCDImageFiller.png'

export const contentfulThumbnailAPIToImageWidth = (image) =>
  image?.fields?.imageBynder
    ? image?.fields?.imageBynder[0]?.width
    : image?.fields?.imageContentful?.fields?.file
    ? image?.fields?.imageContentful?.fields?.file?.details?.image?.width
    : undefined

export const contentfulThumbnailAPIToImageHeight = (image) =>
  image?.fields?.imageBynder
    ? image?.fields?.imageBynder[0]?.height
    : image?.fields?.imageContentful?.fields?.file
    ? image?.fields?.imageContentful?.fields?.file?.details?.image?.height
    : undefined

export const workshopItemToCardData = (workshopItem, variation) => {
  const id = variation?.fields?.variationId
  const actionHref = paths.workshop({
    slug: `${workshopItem.fields.slug}/${
      variation ? variation.fields.variationId : ''
    }`,
  })
  const mediaImg = workshopItem.fields?.spotlightImage?.fields?.imageBynder
    ? workshopItem.fields?.spotlightImage?.fields?.imageBynder[0]?.src.startsWith(
        '//'
      )
      ? 'https:' +
        workshopItem.fields?.spotlightImage?.fields?.imageBynder[0]?.src
      : workshopItem.fields?.spotlightImage?.fields?.imageBynder[0]?.src +
        '?' +
        imageoptimization.qualityParameter +
        '=' +
        imageoptimization.qualityValue
    : workshopItem.fields?.spotlightImage?.fields?.imageContentful?.fields?.file
        ?.url
    ? workshopItem.fields?.spotlightImage?.fields?.imageContentful?.fields?.file?.url.startsWith(
        '//'
      )
      ? 'https:' +
        workshopItem.fields?.spotlightImage?.fields?.imageContentful?.fields
          ?.file?.url
      : workshopItem.fields?.spotlightImage?.fields?.imageContentful?.fields
          ?.file?.url +
        '?' +
        imageoptimization.qualityParameter +
        '=' +
        imageoptimization.qualityValue
    : '/images/ASCDImageFiller.png'
  const title = variation?.fields.title
  const topicTag = workshopItem?.fields?.type?.fields?.title
  const authorName = workshopItem?.fields?.authors
    ?.map((a) => a.fields?.firstName + ' ' + a.fields?.lastName)
    .join(' & ')

  const workshopDate = dateFormat(
    _.min(
      variation?.fields?.sessions.map((s) => {
        return s.fields?.startDatetime
      })
    ),
    'mediumDate'
  )

  //console.log(variation)

  const memberPrice = variation?.fields.memberPrice
  const nonMemberPrice = variation?.fields.nonMemberPrice
  const clockHours = workshopItem.fields.clockHours + ' Clock Hours'
  const stock = 0 // getProductInventory(variation.fields.variationId).stock
  const seatsRemaining = stock ? stock : 0

  return {
    id,
    title,
    actionHref,
    mediaImg,
    topicTag,
    authorName,
    workshopDate,
    memberPrice,
    nonMemberPrice,
    clockHours,
    seatsRemaining,
  }
}

/**
 * Convert workshop content into card data for rendering component
 * @param {Object}
 *
 *
 * @returns
 */
export const workshopItemToCardData1 = (workshopItem) => {
  const actionHref = paths.workshop({ slug: workshopItem.fields.slug })
  const mediaImg = workshopItem.fields?.spotlightImage?.fields?.imageBynder
    ? workshopItem.fields?.spotlightImage?.fields?.imageBynder[0]?.src.startsWith(
        '//'
      )
      ? 'https:' +
        workshopItem.fields?.spotlightImage?.fields?.imageBynder[0]?.src
      : workshopItem.fields?.spotlightImage?.fields?.imageBynder[0]?.src +
        '?' +
        imageoptimization.qualityParameter +
        '=' +
        imageoptimization.qualityValue
    : workshopItem.fields?.spotlightImage?.fields?.imageContentful?.fields?.file
        ?.url
    ? workshopItem.fields?.spotlightImage?.fields?.imageContentful?.fields?.file?.url.startsWith(
        '//'
      )
      ? 'https:' +
        workshopItem.fields?.spotlightImage?.fields?.imageContentful?.fields
          ?.file?.url
      : workshopItem.fields?.spotlightImage?.fields?.imageContentful?.fields
          ?.file?.url +
        '?' +
        imageoptimization.qualityParameter +
        '=' +
        imageoptimization.qualityValue
    : '/images/ASCDImageFiller.png'
  const mediaImgTitle = workshopItem?.fields?.spotlightImage?.fields?.title
  const title = workshopItem.fields.title
  const topicTag = workshopItem?.fields?.type?.fields?.title
  const description = getContentText(workshopItem?.fields?.description)
  const authorName = workshopItem?.fields?.authors
    .map((a) => a.fields?.firstName + ' ' + a.fields?.lastName)
    .join(' & ')
  const authorDescription = workshopItem.fields.authors[0]
    ? workshopItem.fields.authors.map((author) =>
        getContentText(author.fields.description)
      )
    : null
  const variations = getVariations(workshopItem?.fields?.variations)
  const topics = workshopItem?.fields?.topics
    ?.map((item) => item.fields.title)
    ?.slice(0, 5)
  const keywords = workshopItem?.fields?.keywords
    ?.map((item) => item.fields.title)
    ?.slice(0, 5)

  const roles = workshopItem?.fields.roles
    ?.map((item) => item.fields.title)
    ?.slice(0, 4)
  const grades = workshopItem?.fields.grades
    ?.map((item) => item.fields.title)
    ?.slice(0, 5)
  const clockHours = workshopItem.fields.clockHours + ' Clock Hours'

  const workshopDate = dateFormat(
    _.min(
      workshopItem.fields.variations.map((v) =>
        v.fields?.sessions.map((s) => s.fields?.startDatetime)
      )
    )[0],
    'mediumDate'
  )
  return {
    title,
    actionHref,
    mediaImg,
    mediaImgTitle,
    topicTag,
    description,
    topics,
    keywords,
    roles,
    grades,
    authorName,
    authorDescription,
    variations,
    clockHours,
    workshopDate,
  }
}
/**
 *Convert text from contentful data to React components for rendering
 * @param {Object} data - Short Text or Rich Text defined by Contentful
 * @returns {ReactNode}
 */
export const getContentText = (data) => {
  if (data && typeof data !== 'string' && data.nodeType == 'document') {
    const jsonData = JSON.parse(JSON.stringify(data))

    return jsonData?.content[0] !== undefined
      ? documentToReactComponents(jsonData, options)
      : ''
  } else if (typeof data == 'string') {
    return data
  } else {
    return null
  }
}

/**
 * convert workshop variations to object for rendering liveworkshop and snipcart
 * @param {Object} data - variation collection from contentful
 * @returns
 */
export const getVariations = (data) => {
  if (data && data.length == 0) {
    return []
  }
  return data.map((variation) => {
    let variationData = {
      title: variation?.fields?.title,
      variationId: variation?.fields?.variationId,
      nonMemberPrice: variation?.fields?.nonMemberPrice,
      memberPrice: variation?.fields?.memberPrice,
      taxJarId: variation?.fields?.taxJar?.fields?.taxJarId
        ? variation.fields.taxJar.fields.taxJarId
        : '',
      sessions: variation?.fields?.sessions?.map((session) => {
        const sessionData = {
          title: session.fields.title,
          displayTitle: session.fields.displayTitle,
          sessionId: session.fields.sessionId,
          startDate: dateFormat(session.fields.startDatetime, 'longDate'),
          startTime: convertTimeToLocaleTimeWithDST(
            session.fields.startDatetime
          ),
          endDate: dateFormat(session.fields.endDatetime, 'longDate'),
          endTime: convertTimeToLocaleTimeWithDST(session.fields.endDatetime),
        }

        return sessionData
      }),
    }
    const stock = 0 // getProductInventory(variation.fields.variationId).stock
    const seatsRemaining = stock ? stock : 0
    let dateRange = dateFormat(variationData.sessions[0].startDate, 'mmm d')
    const lastDate = dateFormat(
      variationData.sessions[variationData.sessions.length - 1].startDate,
      'mmm d'
    )
    if (dateRange !== lastDate) {
      dateRange = `${dateRange}-${lastDate}`
    }
    variationData = {
      ...variationData,
      dateRange: dateRange,
      seatsRemaining: seatsRemaining,
    }
    return variationData
  })
}

export const articleItemToCardData = (articleItem) => {
  const actionHref =
    articleItem.sys.contentType.sys.id === 'blog'
      ? paths.blog({ slug: articleItem.fields.slug })
      : paths.article({ slug: articleItem.fields.slug })
  const mediaImg = articleItem.fields?.image?.fields?.imageBynder
    ? articleItem.fields?.image?.fields?.imageBynder[0]?.src.startsWith('//')
      ? 'https:' + articleItem.fields?.image?.fields?.imageBynder[0]?.src
      : articleItem.fields?.image?.fields?.imageBynder[0]?.src +
        '?' +
        imageoptimization.qualityParameter +
        '=' +
        imageoptimization.qualityValue
    : articleItem.fields?.image?.fields?.imageContentful?.fields?.file?.url
    ? articleItem.fields?.image?.fields?.imageContentful?.fields?.file?.url.startsWith(
        '//'
      )
      ? 'https:' +
        articleItem.fields?.image?.fields?.imageContentful?.fields?.file?.url
      : articleItem.fields?.image?.fields?.imageContentful?.fields?.file?.url +
        '?' +
        imageoptimization.qualityParameter +
        '=' +
        imageoptimization.qualityValue
    : '/images/ASCDImageFiller.png'
  const title = articleItem.fields.title
  const premium = articleItem.fields.premium
  const topicTag = articleItem.fields.topic?.fields?.title
  const authorName = `${
    articleItem.fields.authors && articleItem.fields.authors.length > 0
      ? `${articleItem.fields.authors[0].fields?.firstName}  ${articleItem.fields.authors[0].fields?.lastName}`
      : ''
  }`
  const datePublished = articleItem.fields.issueDate
  return {
    title,
    actionHref,
    mediaImg,
    premium,
    topicTag,
    authorName,
    datePublished,
  }
}

/**
 * Transform a book version for snipcart in workshop product page
 * @param {Object} book - Book content type from contentful
 * @param {Number} productNumber - book version
 * @returns
 */
export const bookVersionToSnipcart = (book, productNumber, qty = 1) => {
  const version = productNumber
    ? book.fields.bookVersions.find(
        (version) => version.fields.productNumber == productNumber
      )
    : book.fields.bookVersions[0]

  const cartButtonCaptionLabel = getCartButtonCaptionLabel(
    version?.fields?.dateRelease
  )

  const imgUrl = book.fields?.thumbnail?.fields?.imageBynder
    ? book.fields?.thumbnail?.fields?.imageBynder[0]?.src.startsWith('//')
      ? 'https:' + book.fields?.thumbnail?.fields?.imageBynder[0]?.src
      : book.fields?.thumbnail?.fields?.imageBynder[0]?.src +
        '?' +
        imageoptimization.qualityParameter +
        '=' +
        imageoptimization.qualityValue
    : book.fields?.thumbnail?.fields?.imageContentful?.fields?.file?.url
    ? book.fields?.thumbnail?.fields?.imageContentful?.fields?.file?.url.startsWith(
        '//'
      )
      ? 'https:' +
        book.fields?.thumbnail?.fields?.imageContentful?.fields?.file?.url
      : book.fields?.thumbnail?.fields?.imageContentful?.fields?.file?.url +
        '?' +
        imageoptimization.qualityParameter +
        '=' +
        imageoptimization.qualityValue
    : '/images/ASCDImageFiller.png'

  return {
    label: cartButtonCaptionLabel,
    dataItemId: version.fields?.productNumber,
    dataItemBookName: book.fields?.title,
    dataItemName: version.fields?.title,
    dataItemUrl: book.fields.slug,
    dataItemImage: imgUrl,
    dataItemDescription: book.fields.description,
    memberPrice: version.fields?.priceMember,
    nonMemberPrice: version.fields?.priceNonMember,
    dataItemCustom1Value: version?.fields?.taxJar?.fields?.taxJarId
      ? version.fields.taxJar.fields.taxJarId
      : '',
    dataItemCustom2Value: version?.fields?.royaltyFlag
      ? version?.fields?.royaltyFlag
      : false,
    dataItemCustom3Value: book.fields.authors.map(
      (author) =>
        author.fields?.title +
        (author.fields?.email ? '/' + author.fields?.email : '')
    ),
    dataItemCustom4Value:
      cartButtonCaptionLabel === constSnipcart.BTN_LABEL_PREORDER,
    dataItemQuantity: qty,
    digitalFileGuid: version.fields?.digitalFileGuid,
    productReleaseDate: version?.fields?.dateRelease,
  }
}

/**
 * Transform a people data to card data for Directory component
 * @param {*} peopleData - People content type from contentful
 */
export const peopleToCardData = (peopleData) => {
  const alt = peopleData.fields?.thumbnail?.title
    ? peopleData.fields?.thumbnail?.title
    : peopleData.fields?.thumbnail?.fields?.imageContentful?.fields?.title
  const mediaImg = peopleData.fields?.thumbnail?.fields?.imageBynder
    ? `${peopleData.fields?.thumbnail?.fields?.imageBynder[0]?.src}?q=90`
    : `${peopleData.fields?.thumbnail?.fields?.imageContentful?.fields?.file?.url}?q=90`
  const firstName = peopleData.fields?.firstName?.trim()
  const lastName = peopleData.fields?.lastName?.trim()
  const title = peopleData.fields?.title?.trim()
  const profileType = peopleData.fields?.profileType?.map((item) =>
    item.fields?.title?.trim()
  )
  const expertise = peopleData.fields?.expertise?.map((item) =>
    item.fields?.title?.trim()
  )
  const slug = peopleData.fields?.slug

  return {
    title,
    slug,
    firstName,
    lastName,
    mediaImg,
    alt,
    profileType,
    expertise,
  }
}
