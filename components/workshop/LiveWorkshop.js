import React, { useState, useEffect, useContext } from 'react'

import {
  Box,
  Button,
  List,
  ListItem,
  makeStyles,
  Select,
  MenuItem,
} from '@material-ui/core'
import {
  AccessTime as AccessTimeIcon,
  MenuBook as MenuBookIcon,
} from '@material-ui/icons'

import TextStyle from '@/components/atoms/textstyle'
import { AppContext } from '@/context/state'
import { validatePaidMembership } from '@/lib/access-validator'
import dateFormat from 'dateformat'

const useStyles = makeStyles((theme) => ({
  liveWorkshopContainer: {
    backgroundColor: theme.palette.grey.extraLight,
    padding: '20px',
  },
  dateTime: {
    fontWeight: 400,
    fontSize: 20,
    lineHeight: '28px',
    letterSpacing: '2%',
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: '30px',
    color: theme.palette.primary.light,
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
  },
  description: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    color: theme.palette.primary.main,
    maxWidth: '145px',
  },
  itemIcon: {
    fontSize: '15px',
    marginRight: '8px',
  },
  select: {
    width: '136px',
    fontSize: theme.typography.pxToRem(13),
    lineHeight: theme.typography.pxToRem(18),
    fontWeight: 600,
    marginRight: 16,
    padding: '0 8px',
    border: 'solid 1px ' + theme.palette.text.primary,
    borderRadius: '5px',
    '&::before': {
      content: 'unset',
    },
  },
  selectIcon: {
    color: theme.palette.text.primary,
  },
  sessions: {
    width: '100%',
    maxWidth: '592px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'unset',
    },
  },

  sessionItem: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: '20px 0',
    borderBottom: 'solid 1px ' + theme.palette.text.primary,
    '&:last-child': {
      borderBottom: 'none',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
}))
export default function LiveWorkshop({ clockHours, variations }) {
  const classes = useStyles()
  const [otherDates, setOtherDates] = useState(variations[0].variationId)
  const [sessions, setSessions] = useState([])
  const [price, setPrice] = useState()
  const { userAccessData } = useContext(AppContext)
  const useMemberPrice = validatePaidMembership(userAccessData)
  const [seatsRemaining, setSeatsRemaining] = useState(0)
  const handleChange = (event) => {
    setOtherDates(event.target.value)
  }

  useEffect(() => {
    const currentVariation = variations.find(
      (variation) => variation.variationId === otherDates
    )
    setSessions(currentVariation.sessions)
    setSeatsRemaining(currentVariation.seatsRemaining)
    setPrice(
      useMemberPrice
        ? currentVariation.memberPrice
        : currentVariation.nonMemberPrice
    )
    console.log('currentVariation ', currentVariation)
  }, [otherDates])
  return (
    <Box className={classes.liveWorkshopContainer}>
      <TextStyle variant='sessionDate'>Live Workshops</TextStyle>
      <TextStyle variant='sessionDate' className={classes.dateTime}>
        {sessions.length > 1 ? `${sessions.length} Sessions` : '1 Session'} for{' '}
        {clockHours}
      </TextStyle>
      <TextStyle className={classes.title}>
        {seatsRemaining > 0
          ? `ONLY {seatsRemaining} SEATS REMAINING`
          : `NO SEATS REMAINING`}
      </TextStyle>
      <Box className={classes.sessions}>
        <List>
          {sessions.map((session, idx) => (
            <ListItem key={idx} className={classes.sessionItem}>
              <TextStyle variant='overlineLarge'>{session.title}</TextStyle>
              <TextStyle variant='sessionDate'>{session.startDate}</TextStyle>
              <TextStyle variant='h7'>
                {session.startTime}-{session.endTime}
              </TextStyle>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box display='flex' marginBottom={'32px'}>
        <Select
          className={classes.select}
          value={otherDates}
          displayEmpty
          onChange={handleChange}
          inputProps={{
            classes: {
              icon: classes.selectIcon,
            },
          }}
        >
          {variations.map((variation, idx) => (
            <MenuItem value={variation.variationId} key={variation.variationId}>
              <TextStyle variant='h7'>{variation.dateRange}</TextStyle>
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box display='flex' marginBottom='16px'>
        <AccessTimeIcon className={classes.itemIcon} />
        <Box>
          <Box className={classes.subtitle}>1 PM to 5:15 PM EST</Box>
        </Box>
      </Box>
      <Box display='flex'>
        <MenuBookIcon className={classes.itemIcon} />
        <Box>
          <Box className={classes.subtitle}>Required Materials - ${price}</Box>
          <Box className={classes.description}>
            Differentiation in the Elementary Grades: Strategies to Engage &
            Equip All Learners
          </Box>
        </Box>
      </Box>
      <Box marginTop='32px'>
        <Button variant='contained' color='primary' fullWidth size='large'>
          Register Now $189
        </Button>
      </Box>
      <Box marginTop='24px'>
        <Button variant='contained' color='primary' fullWidth size='large'>
          Register Now with Book $209
        </Button>
      </Box>
      <Box marginTop='24px'>
        <Button
          variant='contained'
          fullWidth
          size='large'
          startIcon={<img src='/images/share.svg' alt='share' />}
        >
          Share
        </Button>
      </Box>
    </Box>
  )
}
