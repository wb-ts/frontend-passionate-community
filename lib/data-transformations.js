import imageoptimization from '@/const/imageoptimization'
import paths from '@/paths/path'
import _ from 'lodash'
import getProductInventory from '@/components/Snipcart/SnipcartManager'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import options from '@/const/options'
import dateFormat from 'dateformat'

export const workshopItemToCardData = (workshopItem, variation) => {
  const actionHref = paths.workshop({ slug: workshopItem.fields.slug })
  const mediaImg = workshopItem.fields?.spotlightImage?.fields?.imageBynder
    ? workshopItem.fields?.spotlightImage?.fields?.imageBynder[0]?.src +
      '?' +
      imageoptimization.qualityParameter +
      '=' +
      imageoptimization.qualityValue
    : workshopItem.fields?.spotlightImage?.fields?.imageContentful?.fields?.file
        ?.url
    ? workshopItem.fields?.spotlightImage?.fields?.imageContentful?.fields?.file
        ?.url +
      '?' +
      imageoptimization.qualityParameter +
      '=' +
      imageoptimization.qualityValue
    : '/images/ASCDImageFiller.png'
  const title = workshopItem.fields.title
  const topicTag = workshopItem?.fields?.type?.fields?.title
  const authorName = workshopItem?.fields?.authors
    .map((a) => a.fields?.firstName + ' ' + a.fields?.lastName)
    .join(' & ')
  const workshopDate = dateFormat(
    _.min(
      workshopItem.fields.variations.map((v) =>
        v.fields?.sessions.map((s) => s.fields?.startDatetime)
      )
    )[0],
    'mediumDate'
  )
  const memberPrice = variation.fields.memberPrice
  const nonMemberPrice = variation.fields.nonMemberPrice
  const clockHours = workshopItem.fields.clockHours + ' Clock Hours'
  const stock = getProductInventory(variation.fields.variationId).stock
  const seatsRemaining = stock ? stock : 0

  return {
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
 * @param {Object} workshopItem
 * @returns
 */
export const workshopItemToCardData1 = (workshopItem) => {
  const actionHref = paths.workshop({ slug: workshopItem.fields.slug })
  const mediaImg = workshopItem.fields?.spotlightImage?.fields?.imageBynder
    ? workshopItem.fields?.spotlightImage?.fields?.imageBynder[0]?.src +
      '?' +
      imageoptimization.qualityParameter +
      '=' +
      imageoptimization.qualityValue
    : workshopItem.fields?.spotlightImage?.fields?.imageContentful?.fields?.file
        ?.url
    ? workshopItem.fields?.spotlightImage?.fields?.imageContentful?.fields?.file
        ?.url +
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
  const topics = workshopItem.fields.topics.map((item) => item.fields.title)
  const audience = workshopItem.fields.audience.map((item) => item.fields.title)
  const clockHours = workshopItem.fields.clockHours + ' Clock Hours'

  return {
    title,
    actionHref,
    mediaImg,
    mediaImgTitle,
    topicTag,
    description,
    topics,
    audience,
    authorName,
    authorDescription,
    variations,
    clockHours,
  }
}
/**
 *Convert document from contentful data to React components for rendering
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
 * convert variations data from contentful to object for rendering liveworkshop
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
      sessions: variation?.fields?.sessions?.map((session) => {
        const sessionData = {
          title: session.fields.title,
          sessionId: session.fields.sessionId,
          startDate: dateFormat(session.fields.startDatetime, 'longDate'),
          startTime: dateFormat(session.fields.startDatetime, 'hh:MM TT Z'),
          endTime: dateFormat(session.fields.endDatetime, 'hh:MM TT Z'),
        }
        return sessionData
      }),
    }
    const stock = getProductInventory(variation.fields.variationId).stock
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
    ? articleItem.fields?.image?.fields?.imageBynder[0]?.src +
      '?' +
      imageoptimization.qualityParameter +
      '=' +
      imageoptimization.qualityValue
    : articleItem.fields?.image?.fields?.imageContentful?.fields?.file?.url
    ? articleItem.fields?.image?.fields?.imageContentful?.fields?.file?.url +
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
