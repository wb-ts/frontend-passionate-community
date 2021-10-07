import React from 'react'

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
import sessionsMock from './sessionsMock'
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
export default function LiveWorkshop() {
  const classes = useStyles()
  const [otherDates, setOtherDates] = React.useState(1)

  const handleChange = (event) => {
    setOtherDates(event.target.value)
  }
  return (
    <Box className={classes.liveWorkshopContainer}>
      <TextStyle variant='sessionDate'>Live Workshops</TextStyle>
      <TextStyle variant='sessionDate' className={classes.dateTime}>
        3 Sessions for 3 Clock Hours
      </TextStyle>
      <TextStyle className={classes.title}>
        ONLY THREE SEATS REMAINING
      </TextStyle>
      <Box className={classes.sessions}>
        <List>
          {sessionsMock.map((item, idx) => (
            <ListItem key={idx} className={classes.sessionItem}>
              <TextStyle variant='overlineLarge'>{item.name}</TextStyle>
              <TextStyle variant='sessionDate'>{item.date}</TextStyle>
              <TextStyle variant='h7'>{item.time}</TextStyle>
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
          <MenuItem value={1}>
            <TextStyle variant='h7'>Other Dates</TextStyle>
          </MenuItem>
          <MenuItem value={2}>
            <TextStyle variant='h7'>Other Dates</TextStyle>
          </MenuItem>
          <MenuItem value={3}>
            <TextStyle variant='h7'>Other Dates</TextStyle>
          </MenuItem>
        </Select>
      </Box>
      <Box display='flex' marginBottom='16px'>
        <AccessTimeIcon className={classes.itemIcon} />
        <Box>
          <Box className={classes.subtitle}>1 PM to 5:15 PM EST</Box>
          <Box className={classes.description}>Full schedule</Box>
        </Box>
      </Box>
      <Box display='flex'>
        <MenuBookIcon className={classes.itemIcon} />
        <Box>
          <Box className={classes.subtitle}>Required Materials - $75</Box>
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
