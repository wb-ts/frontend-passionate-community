import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { imageoptimization } from '.'

const defaultOGImage = '/images/ASCDImageFiller.png'

/**
 *
 * @todo Move this to components directory
 */
export const SEOHead = ({ seo }) => {
  const CANONICAL_DOMAIN = 'https://www.ascd.org'
  const title = seo?.fields?.title
    ? seo.fields.id == 'home'
      ? seo.fields.title
      : `${seo.fields.title} - ASCD`
    : 'ASCD'

  const ogDescription =
    seo?.sys?.contentType?.sys?.id === 'seo'
      ? seo?.fields?.description
      : seo?.fields?.description
      ? seo?.fields?.description.nodeType
        ? documentToPlainTextString(seo?.fields?.description)?.substring(0, 300)
        : seo?.fields?.description
      : seo?.fields?.body
      ? seo?.fields?.body.nodeType
        ? documentToPlainTextString(seo?.fields?.body)?.substring(0, 300)
        : seo?.fields?.body
      : seo?.fields?.summary
      ? seo?.fields?.summary.nodeType
        ? documentToPlainTextString(seo?.fields?.summary)?.substring(0, 300)
        : seo?.fields?.summary
      : ''
  return (
    <Head>
      <meta charSet='UTF-8' />
      <title>{title}</title>
      <link rel='canonical' href={`${CANONICAL_DOMAIN}${useRouter().asPath}`} />
      {seo?.sys?.contentType?.sys?.id === 'seo' && (
        <meta name='description' content={seo?.fields?.description} />
      )}
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta
        property='og:url'
        content={
          seo?.fields?.pageUrl
            ? seo?.fields?.pageUrl
            : `${CANONICAL_DOMAIN}${useRouter().asPath}`
        }
      />
      <meta property='og:title' content={title} />
      <meta
        property='og:locale'
        content={seo?.fields?.locale || 'en_US'}
      ></meta>
      <meta
        property='og:site_name'
        content={seo?.fields?.siteName || 'ASCD'}
      ></meta>
      <meta
        property='og:type'
        content={seo?.fields?.ogType || 'website'}
      ></meta>
      <meta property='og:description' content={ogDescription} />
      <meta name='twitter:site' content={seo?.fields?.twitterSite || '@ascd'} />
      <meta
        name='twitter:card'
        content={
          seo?.fields?.twitterCardType?.join(', ') || 'summary_large_image'
        }
      />
      <meta
        name='twitter:image'
        content={
          //Search for Bynder image first, then Contentful, then Blog thumbnail, and default is "ASCDImageFiller.png"
          seo?.fields?.twitterImage?.fields?.imageBynder
            ? `${seo?.fields?.twitterImage?.fields?.imageBynder[0]?.src}?${imageoptimization.qualityParameter}=${imageoptimization.qualityValue}`
            : seo?.fields?.twitterImage?.fields?.imageContentful?.fields?.file
                ?.url
            ? `https:${seo?.fields?.twitterImage?.fields?.imageContentful?.fields?.file?.url}?${imageoptimization.qualityParameter}=${imageoptimization.qualityValue}`
            : seo?.fields?.image?.fields?.imageBynder
            ? `${seo?.fields?.image?.fields?.imageBynder[0]?.src}?${imageoptimization.qualityParameter}=${imageoptimization.qualityValue}`
            : seo?.fields?.image?.fields?.imageContentful?.fields?.file?.url
            ? `https:${seo?.fields?.image?.fields?.imageContentful?.fields?.file?.url}?${imageoptimization.qualityParameter}=${imageoptimization.qualityValue}`
            : seo?.fields?.thumbnail?.fields?.imageBynder
            ? `${seo?.fields?.thumbnail?.fields?.imageBynder[0]?.src}?${imageoptimization.qualityParameter}=${imageoptimization.qualityValue}`
            : seo?.fields?.thumbnail?.fields?.imageContentful?.fields?.file?.url
            ? `https:${seo?.fields?.thumbnail?.fields?.imageContentful?.fields?.file?.url}?${imageoptimization.qualityParameter}=${imageoptimization.qualityValue}`
            : defaultOGImage
        }
      />
      <meta
        property='og:image'
        content={
          //Search for Bynder image first, then Contentful, then Blog thumbnail, and default is "ASCDImageFiller.png"
          seo?.fields?.twitterImage?.fields?.imageBynder
            ? `${seo?.fields?.twitterImage?.fields?.imageBynder[0]?.src}?${imageoptimization.qualityParameter}=${imageoptimization.qualityValue}`
            : seo?.fields?.twitterImage?.fields?.imageContentful?.fields?.file
                ?.url
            ? `https:${seo?.fields?.twitterImage?.fields?.imageContentful?.fields?.file?.url}?${imageoptimization.qualityParameter}=${imageoptimization.qualityValue}`
            : seo?.fields?.image?.fields?.imageBynder
            ? `${seo?.fields?.image?.fields?.imageBynder[0]?.src}?${imageoptimization.qualityParameter}=${imageoptimization.qualityValue}`
            : seo?.fields?.image?.fields?.imageContentful?.fields?.file?.url
            ? `https:${seo?.fields?.image?.fields?.imageContentful?.fields?.file?.url}?${imageoptimization.qualityParameter}=${imageoptimization.qualityValue}`
            : seo?.fields?.thumbnail?.fields?.imageBynder
            ? `${seo?.fields?.thumbnail?.fields?.imageBynder[0]?.src}?${imageoptimization.qualityParameter}=${imageoptimization.qualityValue}`
            : seo?.fields?.thumbnail?.fields?.imageContentful?.fields?.file?.url
            ? `https:${seo?.fields?.thumbnail?.fields?.imageContentful?.fields?.file?.url}?${imageoptimization.qualityParameter}=${imageoptimization.qualityValue}`
            : defaultOGImage
        }
      />
    </Head>
  )
}
export default SEOHead
