import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { client } from 'lib/contentful'
import SEOHead from '@/const/head'
import paths from '@/paths/path'
import Image from 'material-ui-image'
import TextStyle from '@/components/atoms/textstyle'
import TOCNav from '@/components/atoms/tocnav'
import Layout from '@/components/layout'
import HeroArticle from '@/components/molecules/heroarticle'
import ArticleEndnote from '@/components/molecules/articleendnote'
import ContentList from '@/components/molecules/contentlist'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { Box, Container, Grid, Typography } from '@material-ui/core'
import Annotator from '@/components/organisms/annotator'
import TopicTag from '@/components/molecules/topictag'
import TextCTA from '@/components/molecules/textcta'
import ArticleAuthors from '@/components/organisms/articleaauthors'
import { components } from '@/const/components'
import CustomLink from '@/components/atoms/CustomLink'
import { Skeleton } from '@material-ui/lab'
import imageoptimization from '@/const/imageoptimization'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  articleText: {
    width: '100%',
    maxWidth: 674,
  },
  topics: {
    '& > div': {
      marginBottom: theme.spacing(1),
    },
  },
  body: {
    '& blockquote': {
      borderLeft: `${theme.spacing(1)}px solid ${theme.palette.primary.main}`,
      paddingLeft: theme.spacing(2),
    },
  },
  media: {
    width: '110%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
  toc: {
    position: 'relative',
    zIndex: 1,
    [theme.breakpoints.up('md')]: {
      position: 'sticky',
      top: 250,
    },
  },
  publication: {},
}))

function ArticleBody({ refresherKey, children }) {
  const classes = useStyles()
  return (
    <Box id='articleBody' className={classes.body} key={refresherKey}>
      {children}
    </Box>
  )
}

export default function Blog({ blog, relatedBlogs }) {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <Skeleton animation='wave' variant='rect' width='100%' height='100px' />
    )
  }

  const [sidebar, setSidebar] = useState(false)
  const [refresherKey, setRefresherKey] = useState(0)

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) =>
        node?.data?.target?.fields?.file?.contentType === 'application/pdf' ? (
          <CustomLink
            href={node?.data?.target?.fields?.file?.url}
            target={
              node?.data?.target?.fields?.file?.url
                ?.toLowerCase()
                .includes('https://www.ascd.org')
                ? ''
                : '_blank'
            }
          >
            {node?.data?.target?.fields?.file?.fileName}
          </CustomLink>
        ) : (
          <img
            src={
              node.data?.target?.fields?.file?.url +
              '?' +
              imageoptimization.qualityParameter +
              '=' +
              imageoptimization.qualityValue
            }
            alt={node.data?.target?.fields?.title}
            style={{ marginTop: '48px', marginBottom: '48px', width: '100%' }}
          />
        ),
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <Box my={2}>
          <TextStyle variant='articleBody'>{children}</TextStyle>
        </Box>
      ),
      [BLOCKS.HEADING_2]: (node, children) => {
        const slug = convertToSlug(children[0])

        return (
          <Typography
            id={slug}
            component='h2'
            variant='h3'
            style={{ marginBlockStart: '48px', marginBlockEnd: '16px' }}
          >
            {children[0]}
          </Typography>
        )
      },
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        return (
          <Box my={6}>
            {components(node.data.target, Math.floor(Math.random() * 10 + 1))}
          </Box>
        )
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        return (
          <Box my={6}>
            {components(node.data.target, Math.floor(Math.random() * 10 + 1))}
          </Box>
        )
      },
      [INLINES.HYPERLINK]: (node, children) => {
        return (
          <CustomLink
            href={node.data.uri}
            label={children}
            size='large'
            target={
              node.data.uri?.toLowerCase().startsWith('https://www.ascd.org')
                ? ''
                : '_blank'
            }
          />
        )
      },
    },
  }

  const classes = useStyles()

  const convertToSlug = (title) => {
    const titleStr = title && typeof title === 'string' ? title : title[1]
    return titleStr
      ? titleStr
          .toLowerCase()
          .replace(/[^\w ]+/g, '')
          .replace(/ +/g, '-')
      : ''
  }

  const toc_items = blog.fields.body.content
    .filter((node) => node.nodeType == 'heading-2')
    .map((node) => ({
      id: convertToSlug(documentToPlainTextString(node)),
      label: documentToPlainTextString(node),
    }))

  if (blog.fields.blurb) {
    toc_items.unshift({ id: 'abstract', label: 'Abstract' })
  }

  const readingTime = () => {
    const text = document.getElementById('articleBody').innerText
    const wpm = 225
    const words = text.trim().split(/\s+/).length
    const time = Math.ceil(words / wpm)
    return time
  }

  return (
    <Layout>
      <SEOHead seo={blog?.fields?.seo ? blog.fields.seo : blog} />
      <HeroArticle article={blog} minuteRead={() => readingTime()} />
      <Grid container>
        <Grid item md={2} xs={false}>
          <Box
            ml={[2, 2, 2, 10]}
            mt={6}
            className={classes.toc}
            display={['none', 'none', 'block']}
          >
            <TOCNav
              toc_items={toc_items}
              activeBorderWidth='4px'
              backgroundColor='white'
              borderLeft
              maxWidth='290px'
            />
          </Box>
        </Grid>
        <Grid item md={8} xs={12}>
          <Container maxWidth='lg' className={classes.root}>
            <Box id='abstract' className={classes.articleText} my={6}>
              <TextStyle variant='articleAbstract'>
                {documentToReactComponents(blog.fields.blurb, options)}
              </TextStyle>

              <Box my={2} className={classes.topics}>
                {blog.fields.topic && (
                  <TopicTag
                    key={blog.fields.topic.fields?.title}
                    label={blog.fields.topic.fields?.title}
                    variant='basicSmall'
                    marginRight='8px'
                    textTransform='uppercase'
                    onclick={() =>
                      router.push(
                        paths.search({
                          types: ['blog'],
                          topics: [blog.fields.topic.fields.title],
                        })
                      )
                    }
                  />
                )}
                {blog.fields.topicSecondary
                  ?.filter((topic) => topic.fields)
                  .map((topic, key) => (
                    <TopicTag
                      key={key}
                      label={topic.fields.title}
                      variant='basicSmall'
                      marginRight='8px'
                      textTransform='uppercase'
                      onclick={() =>
                        router.push(
                          paths.search({
                            types: ['blog'],
                            topics: [topic.fields.title],
                          })
                        )
                      }
                    />
                  ))}
              </Box>
            </Box>
            {blog.fields.thumbnail && (
              <Box className={classes.media}>
                <Image
                  src={
                    blog.fields?.thumbnail?.fields?.imageBynder
                      ? blog.fields?.thumbnail?.fields?.imageBynder[0]?.src +
                        '?' +
                        imageoptimization.qualityParameter +
                        '=' +
                        imageoptimization.qualityValue
                      : blog.fields?.thumbnail?.fields?.imageContentful?.fields
                          ?.file?.url
                      ? blog.fields?.thumbnail?.fields?.imageContentful?.fields
                          ?.file?.url +
                        '?' +
                        imageoptimization.qualityParameter +
                        '=' +
                        imageoptimization.qualityValue
                      : '/images/ASCDImageFiller.png'
                  }
                  alt={blog.fields?.thumbnail?.fields?.alternate}
                  style={{
                    paddingTop: 0,
                    width: '100%',
                    height: '460px',
                  }}
                  imageStyle={{
                    width: 'inherit',
                    height: 'inherit',
                  }}
                  cover='true'
                />
                {blog.fields.thumbnail &&
                  blog.fields?.thumbnail?.fields?.imageBynder &&
                  blog.fields?.thumbnail?.fields?.imageBynder[0].copyright && (
                    <em>
                      Credit:{' '}
                      {blog.fields?.thumbnail?.fields?.imageBynder[0].copyright}
                    </em>
                  )}
              </Box>
            )}
            <Box
              mt={6}
              ml={2}
              display={['block', 'block', 'none']}
              width='100%'
            >
              <TOCNav
                toc_items={toc_items}
                activeBorderWidth='4px'
                activeBorderColor='black'
                backgroundColor='white'
                borderLeft
                maxWidth='290px'
              />
            </Box>
            <Box className={classes.articleText} my={6}>
              <ArticleBody refresherKey={refresherKey}>
                {documentToReactComponents(blog.fields.body, options)}
              </ArticleBody>

              {blog.fields.authors && (
                <Box mt={7} id='authors'>
                  <ArticleAuthors authors={blog.fields.authors} />
                </Box>
              )}

              <Box mt={9}>
                <TextCTA
                  title='Want to save this article for later?'
                  ctaLabel='Become a member today'
                  ctaLink='/'
                />
              </Box>

              {relatedBlogs?.length > 0 && (
                <Box mt={11}>
                  <ContentList
                    title='Related Articles'
                    ctaLabel='View all'
                    ctaLink={paths.search({
                      types: ['blog', 'article'],
                      topics: [blog.fields.topic.fields?.title],
                    })}
                    items={relatedBlogs}
                    variant='article'
                  />
                </Box>
              )}
            </Box>
          </Container>
        </Grid>
        <Grid item md={2} xs={12}>
          {relatedBlogs?.length > 0 && (
            <Box width='90%' mt={150} display={['none', 'block']}>
              <ContentList
                title='Related Blogs'
                items={relatedBlogs}
                variant='article'
                noImage
              />
            </Box>
          )}

          {/* <Annotator
            userId={77}
            contentId={blog.sys.id}
            contentTitle={blog.fields.title}
            contentImgSrc={
              blog.fields?.image?.fields?.imageBynder
                ? blog.fields?.image?.fields?.imageBynder[0]?.src
                : blog.fields?.image?.fields?.imageContentful?.fields?.file?.url
            }
            contentSlug={blog.fields.slug}
            updateSidebar={(status) => setSidebar(status)}
            domId='articleBody'
            reload={() => setRefresherKey(Math.random())}
            refresherKey={refresherKey}
          /> */}
        </Grid>
      </Grid>
    </Layout>
  )
}

export async function getStaticPaths() {
  const data = await client.getEntries({
    content_type: 'blog',
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
    content_type: 'blog',
    'fields.slug': params.slug,
    include: 4,
  })

  if (!data || !data.items || data.items.length == 0) {
    return {
      notFound: true,
    }
  }

  const relatedBlogs = await client.getEntries({
    content_type: 'blog',
    'sys.id[ne]': data.items[0].sys.id,
    'fields.topic.sys.contentType.sys.id': 'categoryTopics',
    'fields.topic.fields.title': data.items[0].fields.topic?.fields?.title,
  })

  return {
    props: {
      blog: data.items.length ? data.items[0] : undefined,
      relatedArticles: relatedBlogs.items,
    },
    revalidate: 20,
  }
}
