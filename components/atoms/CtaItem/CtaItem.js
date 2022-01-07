import React from 'react'
import { useRouter } from 'next/router'
import { Box, Grid, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import NextImageWrapper from '../../images/NextImageWrapper'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    cursor: ({ url }) => (url ? 'pointer' : 'auto'),
    [theme.breakpoints.up('md')]: {
      width: 199,
    },
  },
  media: {
    width: 96,
    height: 96,
    [theme.breakpoints.up('sm')]: {
      width: 80,
      height: 80,
    },
    [theme.breakpoints.up('md')]: {
      width: 96,
      height: 96,
    },
  },
  tagline: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 700,
    lineHeight: theme.typography.pxToRem(18),
    letterSpacing: 0.2,
    marginTop: 8,
    textAlign: 'left',
    [theme.breakpoints.up('md')]: {
      textAlign: 'center',
    },
  },
  subTagline: {
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 400,
    lineHeight: theme.typography.pxToRem(22),
    letterSpacing: 0.2,
    marginTop: 8,
    textAlign: 'left',
    [theme.breakpoints.up('md')]: {
      textAlign: 'center',
    },
  },
  nextImage: {
    backgroundColor: 'transparent',
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    [theme.breakpoints.up('md')]: {
      alignItems: 'center',
    },
  },
  textRight: {
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1.5),
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: 0,
    },
  },
}))

export default function CtaItem({ icon, tagline, subtagline, url, ...props }) {
  const classes = useStyles({ url })
  const router = useRouter()

  return (
    <Box
      className={classes.root}
      role='button'
      aria-label={`${tagline} button`}
      onClick={() => (url ? router.push(url) : void 0)}
    >
      <Grid container alignItems='center'>
        <Grid item xs={4} md={12} className={classes.gridItem}>
          <Box className={classes.media}>
            <NextImageWrapper
              src={
                icon?.fields?.imageBynder
                  ? icon?.fields?.imageBynder[0]?.src
                  : icon?.fields?.imageContentful?.fields?.file?.url
                  ? icon?.fields?.imageContentful?.fields?.file?.url
                  : '/images/ASCDImageFiller.png'
              }
              alt={icon?.fields?.alternate}
              height={96}
              width={96}
              priority='true'
            />
          </Box>
        </Grid>
        <Grid item xs={8} md={12} className={classes.gridItem}>
          <Box className={classes.textRight}>
            <Typography className={classes.tagline}>{tagline}</Typography>
            <Typography className={classes.subTagline}>{subtagline}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

CtaItem.propTypes = {
  icon: PropTypes.shape({
    fields: PropTypes.shape({
      imageBynder: PropTypes.arrayOf(
        PropTypes.shape({
          src: PropTypes.string,
        })
      ),
      imageContentful: PropTypes.shape({
        fields: PropTypes.shape({
          file: PropTypes.shape({
            url: PropTypes.string,
          }),
        }),
      }),
      alternate: PropTypes.string,
    }),
  }),
  tagline: PropTypes.string,
  subtagline: PropTypes.string,
  url: PropTypes.string,
}
