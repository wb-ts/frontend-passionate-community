import React from 'react'
import { Box, Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Image from 'material-ui-image'
import IssueBannerTitle from '@/components/molecules/issuebannertitle'
import paths from '@/paths/path'
import imageoptimization from '@/const/imageoptimization'

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
    position: 'relative',
    width: '100%',
    // height: '471px',
    minHeight: '445px',
    objectFit: 'fill',

    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      top: '46px',
      width: '424px',
      height: '582px',
    },
    '& img': {
      boxShadow: theme.shadows[10],
    },
  },
}))

export default function IssueBanner({ issue }) {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Container maxWidth='lg' className={classes.container}>
        <Grid container spacing={1} className={classes.container}>
          <Grid item xs={12} sm={6} lg={5} className={classes.relative}>
            <Box className={classes.media}>
              {issue.fields.thumbnail && (
                <Image
                  src={
                    issue.fields?.thumbnail?.fields?.imageBynder
                      ? issue.fields?.thumbnail?.fields?.imageBynder[0]?.src +
                        '?' +
                        imageoptimization.qualityParameter +
                        '=' +
                        imageoptimization.qualityValue
                      : issue.fields?.thumbnail?.fields?.imageContentful?.fields
                          ?.file?.url
                      ? issue.fields?.thumbnail?.fields?.imageContentful?.fields
                          ?.file?.url +
                        '?' +
                        imageoptimization.qualityParameter +
                        '=' +
                        imageoptimization.qualityValue
                      : '/images/ASCDImageFiller.png'
                  }
                  alt={issue.fields.thumbnail.fields?.alternate}
                  style={{
                    position: 'static',
                    backgroundColor: 'transparent',
                  }}
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
                }}
                ctaLabel='Subscribe'
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
