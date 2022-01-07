import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Box, Chip, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import AuthorGroup from '../../components/atoms/AuthorGroup'
import CtaButton from '../../components/atoms/CtaButton'
import TextStyle from '../../components/atoms/TextStyle'
import ShareButtons from '../../components/molecules/sharebuttons'
import SnipcartButton from '../../components/Snipcart/SnipcartButton'
import { getCartButtonCaptionLabel } from '../../lib/utils'
import paths from '../../paths/path'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: (props) => props.align,
    maxWidth: 650,
    margin: '0 auto',
    width: (props) => (props.twoThirds ? '60%' : '100%'),
    marginLeft: (props) => props.twoThirds && 0,
    [theme.breakpoints.down('md')]: {
      width: (props) => props.twoThirds && '100%',
    },
  },
  ctaContainer: {
    display: (props) => (props.align !== 'center' ? 'flex' : 'block'),
    flexDirection: 'column',
    textAlign: 'center',
    paddingTop: theme.spacing(2),
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(4),
      flexDirection: 'row',
      alignItems: 'unset',
    },
  },
  snipcartBtn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    // border: '1px solid #fff',
    '&:hover': {
      backgroundColor: theme.palette.hover.main,
      textDecoration: 'underline',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 100,
      height: '2.5rem',
    },
  },
  ctaBox: {
    width: '100%',
    '& a': {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: 'unset',
      '& a': {
        width: (props) => (props.ctaWidth ? props.ctaWidth : '100%'),
      },
    },
  },
  pipe: {
    display: 'inline-block',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  outlined: {
    backgroundColor: theme.palette.common.white,
  },
  shareBtns: {
    display: 'flex',
    alignItems: 'center',
    '& div': {
      height: 38,
    },
    '& button': {
      height: 38,
    },
  },
}))

export default function IssueBannerTitle({
  tag,
  issue,
  landing,
  ctaLabel,
  ctaLink,
  authors,
  featuredAuthors,
  extraLink,
  ...props
}) {
  const classes = useStyles(props)
  const router = useRouter()

  const dateFormat = require('dateformat')

  const cartButtonCaptionLabel = getCartButtonCaptionLabel(
    issue?.bookVersion?.fields?.dateRelease
  )

  const dt = extraLink
    ? issue.metadata.datePosted &&
      new Date(issue.metadata.datePosted + 'T00:00:00').toString() ==
        'Invalid Date'
      ? new Date(issue.metadata.datePosted)
      : new Date(issue.metadata.datePosted + 'T00:00:00')
    : null

  return (
    <Box className={classes.root}>
      {tag && (
        <Chip
          label='Educational Leadership'
          variant='outlined'
          classes={{ outlined: classes.outlined }}
        />
      )}

      {landing && landing.title && (
        <Box mt={3}>
          <TextStyle variant='h1'>{landing.title}</TextStyle>
        </Box>
      )}
      {landing && landing.subtitle && (
        <Box
          mt={2}
          display='flex'
          justifyContent={props.align == 'center' ? 'center' : 'flex-start'}
        >
          <TextStyle variant='subtitle1'>{landing.subtitle}</TextStyle>
        </Box>
      )}

      {issue && issue.title && (
        <Box my={3}>
          <TextStyle variant='h2'>{issue.title}</TextStyle>
        </Box>
      )}

      {issue && issue.description && (
        <Box my={3}>
          <TextStyle variant='body2'>{issue.description}</TextStyle>
        </Box>
      )}

      {issue && issue.metadata && (
        <Box>
          {issue.metadata.datePosted && (
            <>
              <TextStyle component='span' variant='body3'>
                {dateFormat(
                  issue.metadata.datePosted + 'T00:00:00',
                  'mmmm d, yyyy'
                )}
              </TextStyle>
              <Typography
                component='span'
                variant='body2'
                className={classes.pipe}
              >
                |
              </Typography>
            </>
          )}
          {issue.metadata.volumeNo && (
            <>
              <TextStyle component='span' variant='body3'>
                Volume {issue.metadata.volumeNo}
              </TextStyle>
              <Typography
                component='span'
                variant='body2'
                className={classes.pipe}
              >
                |
              </Typography>
            </>
          )}
          {issue.metadata.issueNo && (
            <>
              <TextStyle component='span' variant='body3'>
                Number {issue.metadata.issueNo}
              </TextStyle>
            </>
          )}
        </Box>
      )}

      <Box mb={2} className={classes.ctaContainer}>
        {issue?.bookVersion && (
          <Box display='flex'>
            <Box pr={2} alignSelf='center'>
              <TextStyle variant='h3'>
                ${issue.bookVersion?.fields?.priceMember}
              </TextStyle>
              <TextStyle variant='h7'>Single Print Issue</TextStyle>
            </Box>
            <Box pr={2}>
              <SnipcartButton
                className={classes.snipcartBtn}
                snipcart={{
                  label: cartButtonCaptionLabel,
                  dataItemId: issue?.bookVersion?.fields?.productNumber,
                  dataItemName: issue?.title,
                  dataItemUrl: issue.slug,
                  dataItemImage: issue.imgUrl.startsWith('//')
                    ? 'https:' + issue.imgUrl
                    : issue.imgUrl,
                  dataItemDescription: issue.description,
                  dataItemPrice: issue?.bookVersion.fields?.priceMember,
                  dataItemCustom1Value: issue?.bookVersion?.fields?.taxJar
                    ?.fields?.taxJarId
                    ? issue?.bookVersion?.fields.taxJar.fields.taxJarId
                    : '',
                  dataItemCustom2Value: issue?.bookVersion?.fields?.royaltyFlag
                    ? issue?.bookVersion?.fields?.royaltyFlag
                    : false,
                  dataItemQuantity: 1,
                  digitalFileGuid: issue?.bookVersion?.fields?.digitalFileGuid,
                  productReleaseDate: issue?.bookVersion?.fields?.dateRelease,
                }}
              />
            </Box>
          </Box>
        )}
        {ctaLabel && (
          <Box mr={[0, 2]} my={[3, 0]} className={classes.ctaBox}>
            <CtaButton
              variant='contained'
              color='primary'
              width='100%'
              size='medium'
              label={ctaLabel}
              href={ctaLink}
            />
          </Box>
        )}

        {authors && (
          <Box className={classes.ctaBox}>
            <AuthorGroup
              double
              authors={featuredAuthors}
              label={authors.ctaLabel}
              link={authors.ctaLink}
              onclick={() => router.push('/authors')}
            />
          </Box>
        )}
      </Box>
      {issue && issue.title && issue.slug && (
        <Box className={classes.shareBtns}>
          <ShareButtons
            url={paths.el({ slug: issue.slug })}
            title={issue.title}
          />
        </Box>
      )}
      {extraLink && dt.getFullYear() == '2021' && dt.getMonth() + 1 == '7' && (
        <Box my={2} px={[5, 0, 0]} textAlign={['center', 'left', 'left']}>
          <Link href='https://share.hsforms.com/1KGJ1NHq1T5Og0HOn6HeZOA4rwbz?__hstc=258360661.7d073d228b90833ecab4fcc424388120.1608059657822.1626182273289.1626206955662.363&__hssc=258360661.2.1626206955662&__hsfp=1879013358'>
            <a target='_blank'>
              <Typography variant='large-link'>
                {'Download the Summer 2021 issue of EL'}
              </Typography>
            </a>
          </Link>
        </Box>
      )}
    </Box>
  )
}

IssueBannerTitle.propTypes = {
  tag: PropTypes.string,
  issue: PropTypes.shape({
    title: PropTypes.string,
    metadata: PropTypes.shape({
      datePosted: PropTypes.string,
      volumeNo: PropTypes.string,
      issueNo: PropTypes.string,
    }),
  }),
  landing: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
  }),
  ctaLabel: PropTypes.string,
  ctaLink: PropTypes.string,
  share: PropTypes.string,
  bookmark: PropTypes.string,
  authors: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string),
    ctaLabel: PropTypes.string,
    ctaLink: PropTypes.string,
  }),
  align: PropTypes.string,
}
