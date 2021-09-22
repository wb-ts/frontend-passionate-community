import React, { useEffect, useState, useContext } from 'react'
import { Box, Container, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { client } from '@/lib/contentful'
import Layout from '@/components/layout'
import SEOHead from '@/const/head'
import HorizontalScroll from '@/components/organisms/horizontalscroll'
import ReadMore from '@/components/molecules/readmore'
import BookBanner from '@/components/organisms/bookbanner'
import Topics from '@/components/molecules/topics'
import paths from '@/paths/path'
import BookToc from '@/components/organisms/BookToc'
import ChapterPreview from '@/components/organisms/ChapterPreview'
import AlternateRows from '@/components/molecules/alternaterows'
import ArticleAuthors from '@/components/organisms/articleaauthors'
import { AppContext } from '@/context/state'
import { hasMemberBookPrice, hasAccessToBook } from '@/lib/access-validator'
import { useRouter } from 'next/router'
import { Skeleton } from '@material-ui/lab'
import { getCartButtonCaptionLabel } from '@/lib/utils'
import constSnipcart from '@/const/snipcart'

const useStyles = makeStyles((theme) => ({
  root: {},
  heading: {
    lineHeight: '18px',
    letterSpacing: '0.3px',
  },
  infoRow: {
    backgroundColor: theme.palette.action.hover,
  },
  infoKey: {
    fontWeight: 700,
    lineHeight: theme.typography.pxToRem(28),
    letterSpacing: '0.2px',
  },
  infoValue: {
    fontWeight: 400,
    lineHeight: theme.typography.pxToRem(28),
    letterSpacing: '0.2px',
  },
  body: {
    maxWidth: 800,
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
  },
}))

export default function Book({ book, relatedBooks, relatedCollections }) {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <Skeleton animation='wave' variant='rect' width='100%' height='100px' />
    )
  }

  const { userAccessData } = useContext(AppContext)
  const useMemberBookPrice = hasMemberBookPrice(userAccessData)
  const hasMemberBookAccess = hasAccessToBook(
    book.fields.memberBook,
    userAccessData
  )

  const classes = useStyles()
  const dateFormat = require('dateformat')
  const [productNumber, setProductNumber] = useState(null)

  const secondaryTopics = book.fields.topicSecondary
    ?.map((topic) => topic.fields?.title)
    .reduce((unique, o) => {
      if (!unique.includes(o)) {
        unique.push(o)
      }
      return unique
    }, [])

  const topics =
    secondaryTopics &&
    secondaryTopics.length > 0 &&
    book.fields.topic?.fields?.title
      ? [book.fields.topic.fields.title].concat(secondaryTopics)
      : book.fields.topic?.fields?.title
      ? [book.fields.topic.fields.title]
      : []

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      const variant = url.searchParams.get('variant')
      setProductNumber(variant)
    }
  }, [])

  const bookVersion = productNumber
    ? book.fields.bookVersions.find(
        (version) => version.fields.productNumber == productNumber
      )
    : book.fields.bookVersions[0]

  return (
    <Layout>
      <SEOHead seo={book?.fields?.seo ? book.fields.seo : book} />
      <Container maxWidth='lg'>
        <Box className={classes.body}>
          <Box mt={[5, 9]}>
            <BookBanner
              book={book}
              productNumber={productNumber}
              updateProductNumber={(pn) => setProductNumber(pn)}
            />
          </Box>
          <Box mt={[5, 9]} id='about'>
            <ReadMore
              title='About'
              titleVariant='h4'
              short={book.fields.description}
              textAlign='left'
              hideSummaryWhenExpanded
            />
          </Box>
          {!book.fields.quickRead && book.fields.chapters?.length > 0 && (
            <Box id='chapters' mt={[5, 9]}>
              <BookToc
                title='Table of contents'
                hasMemberBookAccess={hasMemberBookAccess}
                slug={book.fields.slug}
                chapters={book.fields.chapters.filter((book) => book.fields)}
              />
              <ChapterPreview
                digitalFileGuid={bookVersion?.fields?.digitalFileGuid}
                hasMemberBookAccess={hasMemberBookAccess}
                bookTitle={bookVersion?.fields?.title}
                slug={book.fields.slug}
                chapters={book.fields.chapters.filter((book) => book.fields)}
                productNumber={bookVersion?.fields?.productNumber}
                price={
                  useMemberBookPrice
                    ? bookVersion?.fields?.priceMember
                    : bookVersion?.fields?.priceNonMember
                }
                custom1Value={
                  bookVersion?.fields?.taxJar?.fields?.taxJarId
                    ? bookVersion?.fields.taxJar.fields.taxJarId
                    : ''
                }
                custom2Value={
                  bookVersion?.fields?.royaltyFlag
                    ? bookVersion?.fields?.royaltyFlag
                    : false
                }
                custom3Value={book.fields.authors.map(
                  (author) =>
                    author.fields?.title +
                    (author.fields?.email ? '/' + author.fields?.email : '')
                )}
                custom4Value={
                  getCartButtonCaptionLabel(bookVersion.fields?.dateRelease) ===
                  constSnipcart.BTN_LABEL_PREORDER
                }
                releaseDate={bookVersion?.fields?.dateRelease}
                thumbnail={book.fields.thumbnail}
                description={book.fields.description}
                authors={book.fields.authors}
              />
            </Box>
          )}
          {book.fields.authors.length > 0 && (
            <Box mt={[5, 9]} id='book-authors'>
              <ArticleAuthors
                authors={book.fields.authors}
                title='About the authors'
              />
            </Box>
          )}
          <Box mt={[5, 9]}>
            <AlternateRows
              title='Book details'
              rows={[
                {
                  'Product No.': bookVersion?.fields?.productNumber,
                  ISBN: book?.fields?.isbn,
                  'Release Date': bookVersion?.fields?.dateRelease
                    ? dateFormat(
                        bookVersion?.fields?.dateRelease + 'T00:00:00',
                        'mmmm yyyy'
                      )
                    : '',
                  'Page Count': book?.fields?.pageCount,
                  'Member Book': book?.fields?.memberBook
                    ? book?.fields?.memberBook === 'No'
                      ? 'No'
                      : 'Yes'
                    : 'No',
                },
              ]}
            />
          </Box>

          {topics.length > 0 && (
            <Box id='topics' mt={[5, 9]}>
              <Topics
                title='Topics in this book'
                titleVariant='h4'
                topics={topics}
                contentType='book'
              />
            </Box>
          )}
        </Box>
        <Box my={[5, 9]}>
          <Divider />
        </Box>
        {relatedBooks?.length > 0 && (
          <Box mb={[5, 9]}>
            <HorizontalScroll
              title='Related Books'
              ctaLabel='View all'
              ctaLink={paths.search({
                types: ['book'],
                topics: [
                  book.fields.topic?.fields?.title
                    ? book.fields.topic?.fields?.title
                    : '',
                ],
              })}
              items={relatedBooks}
              type='carttile'
            />
          </Box>
        )}
        <Box my={[5, 9]}>
          <Divider />
        </Box>
        {relatedCollections?.length > 0 && (
          <Box mb={[5, 9]}>
            <HorizontalScroll
              title='Related Collections'
              ctaLabel='View all'
              ctaLink={paths.search({
                types: ['collection'],
              })}
              items={relatedCollections}
              type='collectiontile'
            />
          </Box>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const data = await client.getEntries({
    content_type: 'book',
    select: 'fields.slug',
    limit: process.env.NEXT_STATIC_BUILD_LIMIT || 200,
  })

  return {
    paths: data.items.map((item) => ({
      params: { slug: item.fields.slug },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const data = await client.getEntries({
    content_type: 'book',
    'fields.slug': params.slug,
    include: 4,
  })

  if (!data || !data.items || data.items.length == 0) {
    return {
      notFound: true,
    }
  }

  const collections = await client.getEntries({
    content_type: 'collection',
    'fields.items.sys.id': data.items[0].sys.id,
    include: 2,
  })

  const books = await client.getEntries({
    content_type: 'book',
    'sys.id[ne]': data.items[0].sys.id,
    'fields.topic.sys.contentType.sys.id': 'categoryTopics',
    'fields.topic.fields.title': data.items[0].fields.topic?.fields
      ? data.items[0].fields.topic.fields.title
      : '',
    select:
      'fields.title,fields.slug,fields.authors,fields.thumbnail,fields.description,fields.bookVersions,fields.memberBook',
    include: 2,
    limit: 8,
    order: '-fields.datePublished',
  })

  return {
    props: {
      key: data.items[0].sys.id,
      book: data.items[0],
      relatedBooks: books.items,
      relatedCollections: collections.items.length > 0 ? collections.items : [],
    },
    revalidate: 20,
  }
}
