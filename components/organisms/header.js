import React, { useState, useEffect, useContext } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Toolbar,
  Button,
  Badge,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import useSWR from 'swr'
import NavMenu from '../../components/molecules/navmenu'
import SearchPopover from '../../components/molecules/searchpopover'
import { AppContext } from '../../context/state'
import paths from '../../paths/path'
import NextImageWrapper from '../images/NextImageWrapper'
import { pianoLogInHandler, pianoLogOutHandler } from '../piano/PianoManager'
import UserAccountToolbarMenu from '../UserAccount'

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
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
    [theme.breakpoints.up('md')]: {
      height: 72,
    },
    [theme.breakpoints.up('xl')]: {
      height: 72,
      paddingLeft: '10vw',
      paddingRight: '10vw',
    },
  },
  nextImage1: {
    paddingTop: 0,
    cursor: 'pointer',
    position: 'static',
  },
  nextImage2: {
    paddingTop: 0,
    position: 'static',
  },
  nextImage3: {
    paddingTop: 0,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    marginLeft: '14px',
    position: 'static',
  },
  desktopToolbar: {
    height: 72,
    position: 'relative',
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
  skipLink: {
    position: 'absolute',
    color: theme.palette.text.secondary,
    background: theme.palette.primary.main,
    fontSize: '18px',
    padding: '12px 16px',
    borderRadius: '4px',
    boxShadow: theme.shadows[3],
    left: '43.5%',
    [theme.breakpoints.down('sm')]: {
      left: '35%',
    },
    transform: 'translate(-50%, -180%)',
    transition: 'transform 0.3s',
    zIndex: '100',
    '&:focus': {
      background: theme.palette.hover.main,
      transform: 'translateY(-20%)',
    },
  },
  popoverHolder: {
    width: 300,
    borderRadius: '8px',
  },
  drawerHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '0px 0px 0px 32px',
    padding: '20px 20px 32px',
  },
  drawerHeaderTop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '28px',
  },
  drawerHeaderClose: {
    color: theme.palette.text.secondary,

    '&:hover': {
      color: theme.palette.text.secondary,
    },
  },
  buttonSearchMobile: {
    width: '100%',
    fontWeight: '400',
    height: 56,
    justifyContent: 'flex-start',
    color: theme.palette.text.secondary,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: theme.palette.hover.main,
    },
    '& .MuiButton-label': {
      justifyContent: 'space-between',
    },
  },
}))

export default function Header() {
  const [mobileView, setMobileView] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchPopover, setSearchPopover] = useState(null)
  const [searchPopoverValue, setSearchPopoverValue] = useState('')

  const router = useRouter()

  const { setTopics, grades, setGrades, subjects, setSubjects } =
    useContext(AppContext)

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 960
        ? setMobileView(true)
        : setMobileView(false)
    }
    setResponsiveness()
    window.addEventListener('resize', () => setResponsiveness())

    return () => {
      window.removeEventListener('resize', () => setResponsiveness())
    }
  }, [])

  const classes = useStyles()

  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR(`/api/get-search-categories`, fetcher)

  if (error) {
    console.error(error)
  }

  useEffect(() => {
    if (data) {
      setTopics(data.topics)
      setGrades(data.grades)
      setSubjects(data.subjects)
      // setRoles(data?.roles)
    }
  }, [data])

  const selectedTopics = data?.topics.filter((currentElement) => {
    return (
      currentElement.fields.title == 'Equity' ||
      currentElement.fields.title == 'Leadership' ||
      currentElement.fields.title == 'Assessment' ||
      currentElement.fields.title == 'Technology' ||
      currentElement.fields.title == 'Curriculum' ||
      currentElement.fields.title == 'Social Emotional Learning'
    )
  })

  const openSearchPopover = (event) => {
    setSearchPopover(event.target)
  }

  const closeSearchPopover = () => {
    setSearchPopover(null)
  }

  const triggerSearch = () => {
    setSearchPopover(null)
    router.push(
      paths.search({
        query: searchPopoverValue ? searchPopoverValue : '',
      })
    )
  }

  const onEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      triggerSearch()
    }
  }

  const searchPopoverPlaceholder =
    'Search articles, topics, people, events, books, and more…'
  const searchPopoverPlaceholderMobile = 'Search…'

  const displayDesktop = () => {
    return (
      <Toolbar disableGutters className={classes.desktopToolbar}>
        <Grid container alignItems='center'>
          <Grid item md={8} container>
            <Link href='#mainContent'>
              <a className={classes.skipLink}>Skip to main content</a>
            </Link>
            <Box mr={1.75} tabIndex='0'>
              <Link href='/' className={classes.logoLink}>
                <a>
                  <NextImageWrapper
                    src={'/images/logo.svg'}
                    alt='ascd logo'
                    className={classes.nextImage1}
                    width={109}
                    height={36}
                  />
                </a>
              </Link>
            </Box>
            <NavMenu />
          </Grid>
          <Grid item md={4}>
            <Box display='flex' alignItems='center' justifyContent='flex-end'>
              <Box mr={3}>
                <IconButton
                  aria-label='Open search panel'
                  onClick={openSearchPopover}
                  size='large'
                >
                  <SearchIcon />
                </IconButton>
                <SearchPopover
                  searchPopover={searchPopover}
                  closeSearchPopover={closeSearchPopover}
                  searchPopoverPlaceholder={searchPopoverPlaceholder}
                  searchPopoverValue={searchPopoverValue}
                  setSearchPopoverValue={(event) =>
                    setSearchPopoverValue(event.target.value)
                  }
                  resetSearchPopoverValue={() => setSearchPopoverValue('')}
                  triggerSearch={triggerSearch}
                  onEnterKeyPress={onEnterKeyPress}
                  onCancelKeyPress={() => setSearchPopoverValue('')}
                  topics={selectedTopics}
                  grades={grades}
                  subjects={subjects}
                  center={false}
                  maxWidth={'100%'}
                  background={'transparent'}
                />
              </Box>
              <Divider
                orientation='vertical'
                flexItem
                className={classes.divider}
              />
              <Box mx={3}>
                <IconButton
                  aria-label='checkout cart'
                  className='header__summary snipcart-checkout snipcart-summary'
                  size='large'
                >
                  {/* <Badge badgeContent={4} color='secondary'> */}
                  <ShoppingCartIcon />
                  {/* </Badge> */}

                  {/* <span className='snipcart-items-count'>0</span>
                  <span className='snipcart-total-price'>$0.00</span> */}
                </IconButton>
              </Box>
              <UserAccountToolbarMenu
                loginHandler={pianoLogInHandler}
                logoutHandler={pianoLogOutHandler}
              />
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    )
  }

  const displayMobile = () => {
    const handleDrawerOpen = () => setDrawerOpen(true)
    const handleDrawerClose = () => setDrawerOpen(false)
    return (
      <Toolbar className={classes.mobileToolbar}>
        <a href='#mainContent' className={classes.skipLink}>
          Skip to content
        </a>
        <IconButton
          {...{
            edge: 'start',
            color: 'inherit',
            'aria-label': 'menu',
            'aria-haspopup': 'true',
            onClick: handleDrawerOpen,
          }}
          size='large'
        >
          <MenuIcon />
        </IconButton>

        <Grid container alignItems='center'>
          <Grid item xs={6}>
            <Box ml={1}>
              <Link href='/'>
                <a>
                  <NextImageWrapper
                    src={'/images/logo.svg'}
                    alt='ascd logo'
                    width={109}
                    height={29}
                    className={classes.nextImage2}
                  />
                </a>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6} container justifyContent='flex-end'>
            <IconButton
              aria-label='checkout cart'
              className='header__summary snipcart-checkout snipcart-summary'
              style={{ marginRight: '10px' }}
              size='large'
            >
              <ShoppingCartIcon />
              {/* <Badge badgeContent={4} color='secondary'>
                <ShoppingCartIcon />
              </Badge> */}
            </IconButton>
            <UserAccountToolbarMenu
              loginHandler={pianoLogInHandler}
              logoutHandler={pianoLogOutHandler}
              mobile
            />
          </Grid>
        </Grid>

        <Drawer
          {...{
            anchor: 'left',
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <Box className={classes.drawerHeader}>
            <Box className={classes.drawerHeaderTop}>
              <IconButton
                className={classes.drawerHeaderClose}
                onClick={handleDrawerClose}
                size='large'
              >
                <CloseIcon />
              </IconButton>
              <Box tabIndex='0'>
                <Link href='/'>
                  <a>
                    <NextImageWrapper
                      src={'/images/fulllogo_white.svg'}
                      alt='ascd logo'
                      className={classes.nextImage3}
                      width={109}
                      height={29}
                    />
                  </a>
                </Link>
              </Box>
            </Box>
            <Button
              id='search-button-mobile'
              variant='contained'
              endIcon={<SearchIcon />}
              className={classes.buttonSearchMobile}
              onClick={openSearchPopover}
            >
              Search topics, events, books...
            </Button>
            <SearchPopover
              searchPopover={searchPopover}
              closeSearchPopover={closeSearchPopover}
              searchPopoverValue={searchPopoverValue}
              setSearchPopoverValue={(event) =>
                setSearchPopoverValue(event.target.value)
              }
              resetSearchPopoverValue={() => setSearchPopoverValue('')}
              searchPopoverPlaceholder={searchPopoverPlaceholderMobile}
              triggerSearch={triggerSearch}
              onEnterKeyPress={onEnterKeyPress}
              onCancelKeyPress={() => setSearchPopoverValue('')}
              topics={selectedTopics}
              grades={grades}
              subjects={subjects}
              center={false}
              maxWidth={'100%'}
              background={'transparent'}
            />
          </Box>
          <NavMenu mobile />
        </Drawer>
      </Toolbar>
    )
  }

  return (
    <>
      <AppBar
        elevation={0}
        className={classes.bar}
        style={{ backgroundColor: 'white' }}
      >
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </>
  )
}
