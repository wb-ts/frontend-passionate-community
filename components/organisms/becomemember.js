import React from 'react'
import { Box, Container, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import TextStyle from '../atoms/TextStyle'
import MemberCard from '../molecules/membercard'

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
    'Unlimited Access to Educational Leadership Magazine online',
    'Collaboration with passionate thinkers in the ASCD Professional Learning Community',
    'Member-only Webinars',
    'Member-only Discounts',
    'Originally called Basic Online Membership',
  ]
  const select = [
    'Everything in Digital plus:',
    'Five (5) member books sent to your door each year',
    'Eight (8) print issues of EL Magazine',
    'Online access to the 20 most recent member books',
    'Originally called Select Membership',
  ]
  const premium = [
    'Everything in Digital + Print plus:',
    'Four (4) additional member books - a total of 9 per year',
    '$100 voucher for full-day virtual conference*',
    'Originally called Premium Membership',
  ]

  return (
    <Box className={classes.members} id='subscribe'>
      {!props.noTitle && (
        <Box className={classes.title}>
          <TextStyle variant='h2'>Become a Member</TextStyle>
        </Box>
      )}

      <Container maxWidth='lg'>
        <Grid
          container
          justifyContent='center'
          className={classes.gridContainer}
        >
          <Grid
            item
            xs={12}
            md={4}
            container
            justifyContent='center'
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
            justifyContent='center'
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
            justifyContent='center'
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
