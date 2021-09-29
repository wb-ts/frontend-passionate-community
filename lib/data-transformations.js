import imageoptimization from '@/const/imageoptimization'
import paths from '@/paths/path'

export const articleItemToCardData = (articleItem) => {
  const actionHref = paths.article({ slug: articleItem.fields.slug })
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
