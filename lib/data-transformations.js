import imageoptimization from '@/const/imageoptimization'
import paths from '@/paths/path'
import _ from 'lodash'
import getProductInventory from '@/components/Snipcart/SnipcartManager'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import options from '@/const/options'
import dateFormat from 'dateformat'
import constSnipcart from '@/const/snipcart'
import { getCartButtonCaptionLabel } from '@/lib/utils'
import { PIANO_TERM_NAMES as PTN } from '@/const/piano-term-names'
import { client } from '@/lib/contentful'

export const contentfulThumbnailToImageUrl = (thumbnailGraphql) =>
  thumbnailGraphql?.imageBynder
    ? `${
        thumbnailGraphql.imageBynder[0]?.src.startsWith('//')
          ? 'https:' + thumbnailGraphql.imageBynder[0]?.src
          : thumbnailGraphql.imageBynder[0]?.src
      }?${imageoptimization.qualityParameter}=${imageoptimization.qualityValue}`
    : thumbnailGraphql?.imageContentful?.file?.url
    ? `${
        thumbnailGraphql?.imageContentful?.file?.url.startsWith('//')
          ? 'https:' + thumbnailGraphql?.imageContentful?.file?.url
          : thumbnailGraphql?.imageContentful?.file?.url
      }?${imageoptimization.qualityParameter}=${imageoptimization.qualityValue}`
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

export const workshopItemToCardData = (workshopItem, variation) => {
  const id = variation?.fields?.variationId
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
  const title = variation.fields.title
  const topicTag = workshopItem?.fields?.type?.fields?.title
  const authorName = workshopItem?.fields?.authors
    ?.map((a) => a.fields?.firstName + ' ' + a.fields?.lastName)
    .join(' & ')

  const workshopDate = dateFormat(
    _.min(
      variation.fields?.sessions.map((s) => {
        return s.fields?.startDatetime
      })
    ),
    'mediumDate'
  )

  //console.log(variation)

  const memberPrice = variation.fields.memberPrice
  const nonMemberPrice = variation.fields.nonMemberPrice
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
          startTime: dateFormat(session.fields.startDatetime, 'hh:MM TT Z'),
          endDate: dateFormat(session.fields.endDatetime, 'longDate'),
          endTime: dateFormat(session.fields.endDatetime, 'hh:MM TT Z'),
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

export const orderItemToCardData = (cardItem) => {
  const header1Text = 'Order Placed'
  const header1Value = 'October 7, 2021'
  const header2Text = 'Shipped to'
  const header2Value = 'Gerard Viscido'
  const header3Text = 'Total'
  const header3Value = '21.76'
  const imageUrl = '/images/ASCDImageFiller.png'
  const itemTitle =
    'Social Emotional Learning and the Brain by Marilee Sprenger'
  const itemUrl = '/el/innovative-lesson-planning'
  const itemDate1Text = 'Date:'
  const itemDate1Value = 'October 31, 2021 at 3:00 pm EDT'
  const itemDate2Text = 'Duration:'
  const itemDate2Value = '4 Clock Hours'
  const itemDate3Text = 'Delivered:'
  const itemDate3Value = 'September 23, 2021'
  const button1Text = 'Track Package'
  const button1Url = '/resources'
  const button2Text = 'Receipt/Invoice'
  const button2Url = '/resources'
  const button3Text = 'Cancel my Event'
  const button3Url = '/resources'

  const showHeader = true
  const showHeader1 = true
  const showHeader2 = true
  const showHeader3 = true
  const showImage = true
  const showTitle = true
  const showDates = true
  const showDate1 = true
  const showDate2 = true
  const showDate3 = false
  const showButtons = true
  const showButton1 = true
  const showButton2 = true
  const showButton3 = true

  return {
    showHeader,
    header1Text,
    header1Value,
    showHeader1,
    header2Text,
    header2Value,
    showHeader2,
    header3Text,
    header3Value,
    showHeader3,
    showImage,
    imageUrl,
    showTitle,
    itemTitle,
    itemUrl,
    showDates,
    itemDate1Text,
    itemDate1Value,
    showDate1,
    itemDate2Text,
    itemDate2Value,
    showDate2,
    itemDate3Text,
    itemDate3Value,
    showDate3,
    showButtons,
    button1Text,
    button1Url,
    showButton1,
    button2Text,
    button2Url,
    showButton2,
    button3Text,
    button3Url,
    showButton3,
  }
}

export const addPaymentItemToCardData = (cardItem) => {
  const bgColor = '#005E47'
  const itemTitle = 'Add a new payment'
  const input1Title = 'Enter New Credit card'
  const input1HelpText = 'Assistive text1'
  const showInput1 = true
  const input2Title = 'Confirm Credit card'
  const input2HelpText = 'Assistive text2'
  const showInput2 = true
  const input3Title = 'CVV'
  const input3HelpText = 'Assistive text3'
  const showInput3 = true
  const button1Text = 'Cancel'
  const button1Url = ''
  const showButton1 = true
  const button2Text = 'Save Changes'
  const button2Url = ''
  const showButton2 = true
  const errorMessage = 'Credit Card Number does not match'

  return {
    bgColor,
    itemTitle,
    input1Title,
    input1HelpText,
    showInput1,
    input2Title,
    input2HelpText,
    showInput2,
    input3Title,
    input3HelpText,
    showInput3,
    button1Text,
    button1Url,
    showButton1,
    button2Text,
    button2Url,
    showButton2,
    errorMessage,
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
 * extract membership data from piano user access info and convert for rendering my account tab
 * @param {Array} userAccesses - user access list
 */
export const accessInfoToMembershipData = (userAccesses) => {
  let membershipKeyword = ''
  const membershipAccess = userAccesses?.find((item) => {
    membershipKeyword = PTN.PAID_SUBSCRIPTIONS_KEYWORDS.find((keyword) =>
      item.term.name.includes(keyword)
    )
    return membershipKeyword !== undefined
  })

  const expireDate = new Date(membershipAccess?.expire_date * 1000)
  return {
    userName: membershipAccess?.user?.personal_name,
    membershipName: membershipAccess?.term?.name,
    autoRenew: membershipAccess?.term?.payment_force_auto_renew,
    expireDate:
      expireDate instanceof Date && !isNaN(expireDate)
        ? dateFormat(expireDate, 'longDate')
        : '',
    price: membershipAccess?.term?.payment_billing_plan_table[0]?.priceValue,
    period: membershipAccess?.term?.payment_billing_plan_table[0]?.period,
    membershipKeyword,
  }
}

/**
 * extract membership data from piano user subscription info and convert for rendering my account tab
 * @param {Array} userSubscriptions - user subscription list
 */
export const subscriptionInfoToMembershipData = (userSubscriptions) => {
  let membershipKeyword = ''
  const membership = userSubscriptions?.find((item) => {
    membershipKeyword = PTN.PAID_SUBSCRIPTIONS_KEYWORDS.find((keyword) =>
      item.term.name.includes(keyword)
    )
    return membershipKeyword !== undefined
  })

  const expireDate = new Date(membership?.end_date * 1000)
  return {
    userName: membership?.user?.personal_name,
    membershipName: membership?.term?.name,
    autoRenew: membership?.auto_renew,
    expireDate:
      expireDate instanceof Date && !isNaN(expireDate)
        ? dateFormat(expireDate, 'longDate')
        : '',
    price: membership?.term?.payment_billing_plan_table[0]?.priceValue,
    period: membership?.term?.payment_billing_plan_table[0]?.period,
    membershipKeyword,
    subscription_id: membership.subscription_id,
    cancelable: membership.cancelable,
  }
}
