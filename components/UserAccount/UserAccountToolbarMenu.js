import React, { useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useReactiveVar } from '@apollo/client'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import HistoryIcon from '@mui/icons-material/History'
import ReceiptIcon from '@mui/icons-material/Receipt'
import {
  Box,
  IconButton,
  Avatar,
  Popover,
  Grid,
  Divider,
  Button,
} from '@mui/material'
import { makeStyles, withStyles } from '@mui/styles'
import { hasPaidMembershipVar } from '../../lib/apollo-client/cache'
import useUserAccount from '../../lib/hooks/useUserAccount'
import paths from '../../paths/path'
import CtaButton from '../atoms/CtaButton'
import TextStyle from '../atoms/TextStyle'

const DashboardAnnotations = dynamic(
  () => import('../organisms/dashboardannotations'),
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
  downloads: {
    '& a:hover': {
      textDecoration: 'none !important',
    },
  },
}))

const UserAccountToolbarMenu = ({ loginHandler, logoutHandler, mobile }) => {
  const classes = useStyles()
  const { userAccountUser } = useUserAccount()
  const hasPaidMembership = useReactiveVar(hasPaidMembershipVar)

  const iconBtnRef = useRef(null)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)

  const toggleAnnotationsDrawerHandler = (open) => {
    setPopoverOpen(false)
    setNotesOpen(open)
  }

  const logoutOutClickHandler = () => {
    setPopoverOpen(false)
    logoutHandler && logoutHandler()
  }

  const StyledButton = withStyles({
    root: {
      opacity: 0.6,
    },
  })(Button)

  return userAccountUser ? (
    <>
      <Box ml={[2, 0]}>
        <IconButton
          aria-label='profile button'
          component='span'
          ref={iconBtnRef}
          onClick={() => setPopoverOpen(true)}
        >
          <Avatar
            alt={userAccountUser.name}
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
        open={popoverOpen}
        anchorEl={iconBtnRef?.current}
        onClose={() => setPopoverOpen(false)}
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
                <TextStyle variant='h6'>{userAccountUser.name}</TextStyle>
                <TextStyle variant='body2'>
                  <Link
                    href='/user/account'
                    style={{ textDecoration: 'underline' }}
                  >
                    <a>Edit Account</a>
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
                onClick={() => toggleAnnotationsDrawerHandler(true)}
              >
                Notes & Highlights
              </StyledButton>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box px={2}>
              <StyledButton
                startIcon={<HistoryIcon />}
                className={classes.downloads}
              >
                <Link href='/user/downloads'>
                  <a>My Downloads</a>
                </Link>
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
                onClick={() => logoutOutClickHandler()}
              >
                Sign Out
              </StyledButton>
            </Box>
          </Grid>
        </Grid>
      </Popover>
      <DashboardAnnotations
        userId={userAccountUser.uid}
        open={notesOpen}
        toggleOpen={(open) => toggleAnnotationsDrawerHandler(open)}
      />
    </>
  ) : (
    <>
      <Box ml={1}>
        <CtaButton
          variant='outlined'
          color='primary'
          label='Log In'
          onclick={() => loginHandler && loginHandler()}
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

export default UserAccountToolbarMenu
