import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Container, Grid } from '@material-ui/core'
import MemberCard from '@/components/molecules/membercard'
import TextStyle from '@/components/atoms/textstyle'

const useStyles = makeStyles((theme) => ({
  members: {
    backgroundColor: (props) =>
      props.noBackground ? 'transparent' : '#FEC7C8',
    minHeight: (props) => (props.noBackground ? '1800px' : '1870px'),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: theme.spacing(5),
    // '&::before': {
    //   content: '" "',
    //   borderBottom: (props) =>
    //     props.noBackground ? 'transparent' : '1870px solid #FBD4D5',
    //   borderRight: (props) =>
    //     props.noBackground ? 'transparent' : '100vw solid transparent',
    //   width: 0,
    //   position: 'absolute',
    // },
    [theme.breakpoints.up('md')]: {
      minHeight: (props) => (props.noBackground ? '700px' : '863px'),
      // '&::before': {
      //   borderBottom: (props) =>
      //     props.noBackground ? 'transparent' : '200% solid #FBD4D5',
      // },
    },
  },
  gridContainer: {
    width: '100%',
    marginTop: theme.spacing(6),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(9),
    },
  },
  gridItem: {
    marginBottom: 24,
    [theme.breakpoints.up('md')]: {
      marginBottom: 0,
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 'initial',
    },
  },
  title: {
    marginTop: theme.spacing(6),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(12),
    },
  },
}))

export default function BecomeMember({ ...props }) {
  const classes = useStyles(props)

  const basic = [
    'Unlimited Access to Educational Leadership Magazine Online',
    'Collaboration with passionate thinkers in the ASCD Professional Learning Community',
    'Member-only Webinars',
    'Member-only Discounts',
    'Originally called Basic Membership',
  ]
  const select = [
    'Everything in Basic plus:',
    'Five (5) member books sent to your door each year',
    'Nine (9) print issues of EL Magazine',
    'Online access to the 20 most recent member books',
    'Originally called Select Online Membership',
  ]
  const premium = [
    'Everything in Select plus:',
    'Four (4) additional member books - a total of 9 per year',
    'FREE PD Online course led by ASCD expert author*',
    '$100 voucher for full-day virtual conference*',
    'Originally called Premium Online Membership',
  ]

  return (
    <Box className={classes.members} id='subscribe'>
      {!props.noTitle && (
        <Box className={classes.title}>
          <TextStyle variant='h2'>Become a Member</TextStyle>
        </Box>
      )}

      <Container maxWidth='lg'>
        <Grid container justify='center' className={classes.gridContainer}>
          <Grid
            item
            xs={12}
            md={4}
            container
            justify='center'
            className={classes.gridItem}
          >
            <MemberCard
              title='Digital'
              points={basic}
              price='4.99'
              id='subscription-basic'
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            container
            justify='center'
            className={classes.gridItem}
          >
            <MemberCard
              title='Digital + Print'
              points={select}
              popular
              price='8.99'
              id='subscription-select'
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            container
            justify='center'
            className={classes.gridItem}
          >
            <MemberCard
              title='Premium'
              points={premium}
              price='23.99'
              id='subscription-premium'
              ps='* Available after 3 months of paid membership.'
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
