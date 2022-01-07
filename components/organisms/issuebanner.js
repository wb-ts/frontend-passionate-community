import React from 'react'
import Image from 'next/image'
import { useReactiveVar } from '@apollo/client'
import { Box, Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { hasPaidMembershipVar } from '../../lib/apollo-client/cache'
import { contentfulThumbnailAPIToImageUrl } from '../../lib/data-transformations'
import paths from '../../paths/path'
import NextImageWrapper from '../images/NextImageWrapper'
import IssueBannerTitle from '../molecules/issuebannertitle'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 580,
    backgroundColor: theme.palette.grey.extraLight,
    [theme.breakpoints.up('sm')]: {
      minHeight: 520,
    },
    [theme.breakpoints.up('md')]: {
      minHeight: 515,
      height: 515,
      marginBottom: 150,
    },
  },
  container: {
    height: '100%',
  },
  relative: {
    position: 'relative',
    marginTop: 20,
    [theme.breakpoints.up('md')]: {
      marginTop: 0,
    },
  },
  media: {
    display: 'block',
    position: 'relative',
    width: '100%',
    // height: '471px',
    // minHeight: '445px',
    //objectFit: 'fill',
    boxShadow: theme.shadows[10],

    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: '46px',
      width: '424px',
      //height: '582px',
    },
  },
}))

export default function IssueBanner({ issue }) {
  const classes = useStyles()
  const useMemberPrice = useReactiveVar(hasPaidMembershipVar)
  return (
    <Box className={classes.root}>
      <Container maxWidth='lg' className={classes.container}>
        <Grid container spacing={1} className={classes.container}>
          <Grid item xs={12} sm={6} lg={5} className={classes.relative}>
            <Box className={classes.media}>
              {issue.fields.thumbnail && (
                <NextImageWrapper
                  src={contentfulThumbnailAPIToImageUrl(issue.fields.thumbnail)}
                  alt={issue.fields.thumbnail.fields?.alternate}
                  width={424}
                  height={582}
                  layout='responsive'
                  priority='true'
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} lg={7}>
            <Box
              pl={[0, 6]}
              mt={[2, 0]}
              display='flex'
              alignItems={['flex-start', 'center']}
              height='100%'
              width={['100%', '100%', '90%']}
            >
              <IssueBannerTitle
                tag='Educational Leadership'
                issue={{
                  title: issue.fields.title,
                  metadata: {
                    datePosted: issue.fields.publicationDate,
                    volumeNo: issue.fields.volNo.toString(),
                    issueNo: issue.fields.issueNo.toString(),
                  },
                  slug: issue.fields.slug,
                  bookVersion: issue?.fields?.bookVersion,
                  imgUrl: contentfulThumbnailAPIToImageUrl(
                    issue?.fields?.thumbnail
                  ),
                  description: issue?.fields?.shortDescription,
                }}
                ctaLabel={useMemberPrice ? '' : 'Subscribe'}
                ctaLink={paths.subscribe}
                align='left'
                extraLink
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
