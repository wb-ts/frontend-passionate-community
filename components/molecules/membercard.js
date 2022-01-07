import React from 'react'
import { Paper, Box, Chip, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CtaButton from '../atoms/CtaButton'
import TextStyle from '../atoms/TextStyle'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    width: 325,
    borderRadius: 16,
    [theme.breakpoints.up('md')]: {
      width: 295,
    },
    [theme.breakpoints.up('lg')]: {
      width: '325px',
      height: 'calc(100% - 24px)',
    },
    boxShadow:
      '0px 8px 10px rgba(0, 0, 0, 0.03), 0px 3px 14px rgba(0, 0, 0, 0.04), 0px 5px 5px rgba(0, 0, 0, 0.08)',
  },
  rootPopular: {
    boxShadow:
      '0px 24px 38px rgba(0, 0, 0, 0.04), 0px 9px 46px rgba(0, 0, 0, 0.08), 0px 11px 15px rgba(0, 0, 0, 0.08)',
    [theme.breakpoints.down('md')]: {
      boxShadow:
        '0px 8px 10px rgba(0, 0, 0, 0.03), 0px 3px 14px rgba(0, 0, 0, 0.04), 0px 5px 5px rgba(0, 0, 0, 0.08)',
    },
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: '16px 24px 36px',
    height: 150,
    backgroundColor: theme.palette.accent.paleGreen,
    borderRadius: 16,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 0,
  },
  headerPopular: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '16px 24px 36px',
    height: 174,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 16,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 0,
    color: theme.palette.common.white,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
      top: '-24px',
    },
    '& ~ $details': {
      [theme.breakpoints.up('md')]: {
        position: 'relative',
        top: '-24px',
      },
    },
  },
  currency: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: 600,
    lineHeight: theme.typography.pxToRem(24),
    letterSpacing: '0.02em',
  },
  price: {
    fontSize: '3.5rem',
    fontWeight: 800,
    lineHeight: theme.typography.pxToRem(50),
    letterSpacing: '0.02em',
  },
  perMonthPopular: {
    color: theme.palette.common.white,
    opacity: 0.6,
    alignSelf: 'flex-end',
  },
  perMonth: {
    color: theme.palette.common.black,
    opacity: 0.6,
    alignSelf: 'flex-end',
  },
  label: {
    marginLeft: 'auto',
    textTransform: 'uppercase',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: theme.palette.common.white,
  },
  details: {
    padding: '40px 32px',
    [theme.breakpoints.up('md')]: {
      // height: 'calc(100% - 150px)',
      height: 536,
    },
    [theme.breakpoints.up('lg')]: {
      // height: 'calc(100% - 174px)',
    },
    '& ul': {
      paddingLeft: '26px',
      marginBottom: 0,
      '& li:last-child': {
        marginBottom: 0,
      },
    },
  },
  pointer: {
    marginBottom: theme.spacing(1),
    '& p.MuiTypography-root': {
      fontSize: 14,
    },
  },
}))

export default function MemberCard({
  free,
  popular,
  price,
  title,
  points,
  id,
  ps,
}) {
  const classes = useStyles()
  return (
    <Paper
      className={
        popular ? `${classes.root} ${classes.rootPopular}` : classes.root
      }
    >
      <Box className={popular ? classes.headerPopular : classes.header}>
        {popular && <Chip label='Most Popular' className={classes.label} />}
        <Box display='flex'>
          <Typography className={classes.currency}>$</Typography>
          <Typography className={classes.price}>{price}</Typography>
          <Typography
            variant='subtitle2'
            className={popular ? classes.perMonthPopular : classes.perMonth}
          >
            /month
          </Typography>
        </Box>
      </Box>
      <Box
        className={classes.details}
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
      >
        <Box mb={5}>
          <TextStyle variant='h3'>{title}</TextStyle>
          <ul>
            {points &&
              points.map((point, key) => (
                <li key={`${title}-pointer-${key}`} className={classes.pointer}>
                  <TextStyle variant='body3'>{point}</TextStyle>
                </li>
              ))}
          </ul>
        </Box>
        <Box py={3}>
          <TextStyle variant='body3'>{ps}</TextStyle>
        </Box>

        <CtaButton
          variant='contained'
          color='primary'
          size='large'
          label={free ? 'Get Started' : 'Join'}
          backgroundColor={'#3C64B1'}
          id={id}
        />
      </Box>
    </Paper>
  )
}
