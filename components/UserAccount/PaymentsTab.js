import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Paper } from '@material-ui/core'
import TextStyle from '@/components/atoms/TextStyle'
import CtaButton from '@/components/atoms/CtaButton'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 998,
    flexGrow: 1,
    textAlign: 'center',
    boxShadow:
      '0px 12px 17px rgb(0 0 0 / 3%), 0px 5px 22px rgb(0 0 0 / 4%), 0px 7px 8px rgb(0 0 0 / 8%)',
  },
  membershipCurrent: {
    background: theme.palette.primary.main,
    borderRadius: '0px 0px 0px 32px',
    display: 'flex',
    margin: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: 'white',
    minHeight: 496,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 325,
    },
  },
  membershipHandle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '24px 24px 15px',
    color: 'white',
    minHeight: 496,
    height: '100%',
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 325,
    },
  },
  subtitle: {
    fontWeight: 800,
    fontSize: 24,
    lineHeight: '34px',
  },
  paperYourMembership: {
    paddingLeft: theme.spacing(1), //grid padding
    textAlign: 'left',
    background: theme.palette.primary.main,
    color: theme.palette.text.secondary,
  },

  membershipDetails: {
    height: '100%',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 0,
  },
  paperRight: {
    padding: theme.spacing(1), //grid padding
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  currency: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: 600,
    lineHeight: theme.typography.pxToRem(24),
    letterSpacing: '0.02em',
  },
  price: {
    fontSize: theme.typography.pxToRem(56),
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
  //
}))

const PaymentsTab = () => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={12} md={4} className={classes.membershipCurrent}>
          <Paper elevation={0} className={classes.paperYourMembership}>
            <TextStyle className={classes.subtitle}>Your membership</TextStyle>
          </Paper>
          <Paper elevation={0} className={classes.paperYourMembership}>
            <TextStyle className={classes.subtitle}>
              Digital + Print Select
            </TextStyle>
            <Box mt={1} mb={1} display='flex'>
              <Typography className={classes.currency}>$</Typography>
              <Typography className={classes.price}>89</Typography>
              <Typography
                variant='subtitle2'
                className={classes.perMonthPopular}
              >
                /year
              </Typography>
            </Box>
            <TextStyle variant='body3'>
              Membership renewed annually on 12/31/2021 until you tell us to
              stop
            </TextStyle>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} className='second-part'>
          <ul className={classes.membershipDetails}>
            <li className={classes.name}>
              <TextStyle variant='body3'>
                Morbi leo risus, porta ac consectetur ac, vestibulum
              </TextStyle>
            </li>
            <li className={classes.name}>
              <TextStyle variant='body3'>
                Morbi leo risus, porta ac consectetur ac, vestibulum
              </TextStyle>
            </li>
            <li className={classes.name}>
              <TextStyle variant='body3'>
                Morbi leo risus, porta ac consectetur ac, vestibulum
              </TextStyle>
            </li>
            <li className={classes.name}>
              <TextStyle variant='body3'>
                Morbi leo risus, porta ac consectetur ac, vestibulum
              </TextStyle>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} md={4} className={classes.membershipHandle}>
          <Paper elevation={0} className={classes.paperRight}>
            <Box>
              <CtaButton
                variant='contained'
                fullWidth
                color='primary'
                label='Upgrade your Membership'
              />
            </Box>

            <Box mt={1.5}>
              <CtaButton
                variant='contained'
                fullWidth
                color='primary'
                label='Your Digital Downloads'
              />
            </Box>
            <Box mt={1.5}>
              <CtaButton
                variant='contained'
                fullWidth
                color='primary'
                label='Your Payment Methods'
              />
            </Box>
            <Box mt={1.5}>
              <CtaButton
                variant='contained'
                fullWidth
                color='primary'
                label='Renew my Membership'
              />
            </Box>
          </Paper>
          <Paper elevation={0} className={classes.paperRight}>
            <Box mb={1}>
              <CtaButton
                variant='outlined'
                fullWidth
                label='Cancel my Membership'
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PaymentsTab
