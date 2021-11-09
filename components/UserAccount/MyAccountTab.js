import React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/material'
import TextStyle from '@/components/atoms/TextStyle'
import CtaButton from '@/components/atoms/CtaButton'
import TwoColumnCta from '@/components/molecules/twocolumncta'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 998,
    flexGrow: 1,
    textAlign: 'center',
    boxShadow:
      '0px 12px 17px rgb(0 0 0 / 3%), 0px 5px 22px rgb(0 0 0 / 4%), 0px 7px 8px rgb(0 0 0 / 8%)',
    borderRadius: '16px',
  },
  currentMembership: {
    background: theme.palette.primary.main,
    display: 'flex',
    margin: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    minHeight: 384,
    height: '100%',
    borderRadius: '16px 0 32px 16px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 325,
      borderRadius: '16px',
    },
  },
  membershipHandle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '24px 24px 15px',
    color: 'white',
    minHeight: 384,
    height: '100%',
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 325,
    },
  },
  subtitle: {
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(16),
    lineHeight: theme.typography.pxToRem(26),
  },
  membershipLabel: {
    fontWeight: 800,
    fontSize: theme.typography.pxToRem(24),
    lineHeight: theme.typography.pxToRem(34),
  },
  membershipDetail: {
    paddingLeft: theme.spacing(1), //grid padding
    textAlign: 'left',
    background: theme.palette.primary.main,
    color: theme.palette.text.secondary,
  },
  membershipFooter: {
    display: 'flex',
    justifyContent: 'end',
  },
  membershipRenew: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 500,
    lineHeight: theme.typography.pxToRem(20),
  },
  membershipDetailLink: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 500,
    lineHeight: theme.typography.pxToRem(20),
    textDecoration: 'underline',
  },
  secondPart: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  membershipContent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-around',
    margin: 0,
    textAlign: 'start',
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
  name: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  //
}))

const MyAccountTab = ({
  membershipName,
  autoRenew,
  expireDate,
  price,
  period,
  description,
}) => {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={12} md={4} className={classes.currentMembership}>
          <Box className={classes.membershipDetail}>
            <TextStyle className={classes.subtitle}>Account Status</TextStyle>
            <TextStyle className={classes.membershipLabel}>
              {membershipName ? membershipName : 'Free User'}
            </TextStyle>
            {membershipName && (
              <Box>
                <Box mt={1} mb={1} display='flex'>
                  <TextStyle className={classes.currency}>$</TextStyle>
                  <TextStyle className={classes.price}>{price}</TextStyle>
                  <TextStyle
                    variant='subtitle2'
                    className={classes.perMonthPopular}
                  >
                    /{period === 'year' ? 'annually' : period}
                  </TextStyle>
                </Box>
                <Box>
                  <TextStyle className={classes.membershipRenew}>
                    {autoRenew ? 'Renews' : 'Expires'} {expireDate}
                  </TextStyle>
                  <TextStyle className={classes.membershipDetailLink}>
                    Membership Details
                  </TextStyle>
                </Box>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={4} className={classes.secondPart}>
          <Box className={classes.membershipContent}>{description}</Box>
        </Grid>
        <Grid item xs={12} md={4} className={classes.membershipHandle}>
          <Box>
            <CtaButton
              variant='contained'
              fullWidth
              color='primary'
              label='Upgrade Membership'
            />
          </Box>

          <Box>
            <CtaButton
              variant='contained'
              fullWidth
              color='primary'
              label='Digital Downloads'
            />
          </Box>
          <Box>
            <CtaButton
              variant='contained'
              fullWidth
              color='primary'
              label='Payment Methods'
            />
          </Box>
          <Box>
            <CtaButton
              variant='contained'
              fullWidth
              color='primary'
              label='Renew Membership'
            />
          </Box>
          <Box mt={2}>
            <CtaButton variant='outlined' fullWidth label='Cancel Membership' />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MyAccountTab
