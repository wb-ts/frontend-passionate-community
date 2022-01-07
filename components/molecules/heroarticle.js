import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Grid, Box, Avatar, AvatarGroup, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import TextStyle from '../../components/atoms/TextStyle'
import ShareButtons from '../../components/molecules/sharebuttons'
import { imageoptimization } from '../../const'
import paths from '../../paths/path'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey.extraLight,
    borderBottomLeftRadius: 64,
    padding: '50px 10px',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      height: 384,
      paddingTop: '80px',
      paddingBottom: '80px',
      borderBottomLeftRadius: 156,
      margin: 0,
    },
  },
  content: {
    width: '100%',
    margin: 'auto',
    [theme.breakpoints.up('md')]: {
      maxWidth: 674,
    },
  },

  articleText: {
    width: '100%',
    maxWidth: 674,
  },
}))

export default function HeroArticle({ article, minuteRead }) {
  if (!article) {
    return ''
  }

  const classes = useStyles()
  const [min, setMin] = useState(0)
  const dateFormat = require('dateformat')

  useEffect(() => {
    if (document) {
      const time = minuteRead()
      setMin(time)
    }
  }, [])

  const dateField = article.fields.issueDate
    ? article.fields.issueDate
    : article.fields.date || Date.now()

  const dt =
    new Date(dateField + 'T00:00:00').toString() == 'Invalid Date'
      ? new Date(dateField)
      : new Date(dateField + 'T00:00:00')

  const yyyymmdd =
    dt.getFullYear() +
    '-' +
    ('0' + (dt.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + dt.getDate()).slice(-2)

  const authorThumbnails = article.fields.authors.filter(
    (author) => author.fields?.thumbnail
  )

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      className={classes.root}
    >
      <Box className={classes.content}>
        <Box mb={2} display='flex'>
          <TextStyle variant='body3'>
            {dateFormat(yyyymmdd + 'T00:00:00', 'longDate')}
          </TextStyle>
          <Box mx={1}>•</Box>
          <TextStyle variant='body3'>{min > 0 ? `${min} min` : ''}</TextStyle>
        </Box>
        <Box mb={5}>
          <TextStyle variant='h1'>{article.fields.title}</TextStyle>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7} container alignItems='center'>
            {article.fields.authors && (
              <>
                <AvatarGroup max={2}>
                  {authorThumbnails.map((author, key) => (
                    <Avatar
                      key={`author-avatar-${key}`}
                      src={
                        author?.fields?.thumbnail?.fields?.imageBynder
                          ? author.fields?.thumbnail?.fields?.imageBynder[0]
                              ?.src +
                            '?' +
                            imageoptimization.qualityParameter +
                            '=' +
                            imageoptimization.qualityValue
                          : author.fields?.thumbnail?.fields?.imageContentful
                              ?.fields?.file?.url +
                            '?' +
                            imageoptimization.qualityParameter +
                            '=' +
                            imageoptimization.qualityValue
                      }
                      alt='author avatar'
                    />
                  ))}
                </AvatarGroup>
                {article.fields.authors.map((author, key) => (
                  <Box
                    key={`author-link-${key}`}
                    ml={authorThumbnails && authorThumbnails.length > 0 ? 1 : 0}
                    mr={authorThumbnails && authorThumbnails.length > 0 ? 0 : 1}
                  >
                    {author.fields && (
                      <Link href={paths.author({ slug: author.fields.slug })}>
                        <a>
                          <Typography variant='medium-link' color='#005E47'>
                            {author.fields.title}
                          </Typography>
                        </a>
                      </Link>
                    )}

                    {article.fields.authors.length - 1 > key && ','}
                  </Box>
                ))}
              </>
            )}
          </Grid>
          <Grid item xs={12} md={5} container justifyContent='flex-end'>
            <ShareButtons
              url={
                article?.sys?.contentType?.sys?.id === 'blog'
                  ? paths.blog({ slug: article.fields.slug })
                  : paths.article({ slug: article.fields.slug })
              }
              title={article.fields.title}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
