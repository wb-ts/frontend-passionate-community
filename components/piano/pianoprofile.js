import React, { useContext, useEffect, useState } from 'react'
import {
  Box,
  IconButton,
  Avatar,
  Popover,
  Grid,
  Divider,
  Button,
} from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import CtaButton from '@/components/atoms/ctabutton'
import Link from 'next/link'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'
import HistoryIcon from '@material-ui/icons/History'
import ReceiptIcon from '@material-ui/icons/Receipt'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import dynamic from 'next/dynamic'
import { AppContext } from '@/context/state'
import TextStyle from '@/components/atoms/textstyle'
import paths from '@/paths/path'
import { validatePaidMembership } from '@/lib/access-validator'
// Add these imports
import useSWR from 'swr'
import Axios from 'axios'

const DashboardAnnotations = dynamic(
  () => import('@/components/organisms/dashboardannotations'),
  {
    ssr: false,
  }
)

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    background: theme.palette.background.light,
    height: 56,
    paddingLeft: '2vw',
    paddingRight: '2vw',
    color: theme.palette.text.primary,
    [theme.breakpoints.up('md')]: {
      height: 72,
    },
    [theme.breakpoints.up('xl')]: {
      height: 72,
      paddingLeft: '10vw',
      paddingRight: '10vw',
    },
  },
  desktopToolbar: {
    height: 72,
  },
  mobileToolbar: {
    height: 56,
    minHeight: 56,
  },
  divider: {
    backgroundColor: '#C5CED1',
    height: '32px',
    margin: 4,
  },
  avatar: {
    width: 32,
    height: 32,
    border: '2px solid white',
    boxShadow: theme.shadows[3],
  },
  popoverHolder: {
    width: 300,
    borderRadius: '8px',
  },
}))

export default function PianoProfile({ mobile }) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [notesOpen, setNotesOpen] = useState(false)

  const { user, setUser, userAccessData } = useContext(AppContext)
  const hasPaidMembership = validatePaidMembership(userAccessData)

  const handleAccountClick = (event) => {
    setAnchorEl(event.target)
  }

  const handleAccountClose = () => {
    setAnchorEl(null)
  }

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setAnchorEl(null)
    setNotesOpen(open)
  }

  const StyledButton = withStyles({
    root: {
      opacity: 0.6,
    },
  })(Button)

  const loginPiano = async (tp) => {
    try {
      await tp.push(['init'])
    } catch (e) {
      throw Error(e.message)
    }
  }

  let tp = null
  if (typeof window !== 'undefined' && typeof window.tp !== 'undefined') {
    tp = window.tp

    //if (tp) {
    //loginPiano(tp)
    //}
  }

  const addLoginSuccessHandler = async () => {
    tp.push([
      'addHandler',
      'loginSuccess',
      function (data) {
        setUser({
          id: data.params.uid,
          name: `${data.params.given_name} ${data.params.family_name}`,
        })
      },
    ])
  }

  useEffect(() => {
    if (tp) {
      const user = tp.user?.getProvider().getUser()
      if (user) {
        setUser({
          id: user.uid,
          name: `${user.given_name} ${user.family_name}`,
        })
      }
      addLoginSuccessHandler()
    }
  }, [])

  const logout = () => {
    setAnchorEl(null)
    tp?.user?.logout()

    setUser({
      id: null,
      name: null,
    })
  }

  return user.id ? (
    <>
      <Box ml={[2, 0]}>
        <IconButton
          aria-label='profile button'
          component='span'
          onClick={(e) => handleAccountClick(e)}
        >
          <Avatar
            alt={user.name}
            src='/static/images/avatar/3.jpg'
            className={classes.avatar}
          />
        </IconButton>
      </Box>
      {!mobile && !hasPaidMembership && (
        <Box ml={3}>
          <CtaButton
            variant='contained'
            color='primary'
            label='Upgrade'
            href={paths.subscribe}
          />
        </Box>
      )}
      <Popover
        id='header-profile'
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleAccountClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Grid container className={classes.popoverHolder} spacing={2}>
          <Grid item xs={12}>
            <Box display='flex' alignItems='center' pt={2} px={2}>
              <AccountCircleIcon className={classes.accountIcon} />
              <Box ml={2}>
                <TextStyle variant='h6'>{user.name}</TextStyle>
                <TextStyle variant='body2'>
                  <Link
                    href='/user/account'
                    style={{ textDecoration: 'underline' }}
                  >
                    Edit Account
                  </Link>
                </TextStyle>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {/* <Grid item xs={12}>
              <Box px={2}>
                <StyledButton startIcon={<BookmarkIcon />}>
                  Bookmarks
                </StyledButton>
              </Box>
            </Grid> */}
          <Grid item xs={12}>
            <Box px={2}>
              <StyledButton
                startIcon={<FormatQuoteIcon />}
                onClick={toggleDrawer(true)}
              >
                Notes & Highlights
              </StyledButton>
            </Box>
          </Grid>
          {/* <Grid item xs={12}>
              <Box px={2}>
                <StyledButton startIcon={<HistoryIcon />}>
                  Browsing History
                </StyledButton>
              </Box>
            </Grid> */}
          {/* <Grid item xs={12}>
              <Box px={2}>
                <StyledButton startIcon={<ReceiptIcon />}>My Orders</StyledButton>
              </Box>
            </Grid> */}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Box px={2} mb={2}>
              <StyledButton
                startIcon={
                  <ExitToAppIcon style={{ transform: 'rotate(-180deg)' }} />
                }
                onClick={() => logout()}
              >
                Sign Out
              </StyledButton>
            </Box>
          </Grid>
        </Grid>
      </Popover>
      <DashboardAnnotations
        userId={user.id}
        open={notesOpen}
        toggleOpen={(v) => toggleDrawer(v)}
      />
    </>
  ) : (
    <>
      <Box ml={1}>
        <CtaButton
          variant='outlined'
          color='primary'
          label='Log In'
          onclick={() => {
            tp.pianoId.show()
          }}
        />
      </Box>
      {!mobile && (
        <Box ml={1}>
          <CtaButton
            variant='contained'
            color='primary'
            label='Subscribe'
            id='subscribe'
            href={paths.subscribe}
          />
        </Box>
      )}
    </>
  )
}
