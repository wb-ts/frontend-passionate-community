import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import CloseIcon from '@mui/icons-material/Close'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import {
  Box,
  Modal,
  Grid,
  Typography,
  Avatar,
  Button,
  IconButton,
  Card,
  CardActionArea,
  CardContent,
  Link,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import _ from 'lodash'
import { options, imageoptimization } from '../../../const'
import TextStyle from '../../atoms/TextStyle'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      '& .MuiButtonBase-root': {
        justifyContent: 'flex-start',
      },
    },
  },
  medium: {
    width: '120px',
    height: '120px',
    border: '2px solid rgba(255, 255, 255, 0.8)',
    boxShadow: theme.shadows[4],
    [theme.breakpoints.up('md')]: {
      border: '4px solid rgba(255, 255, 255, 0.8)',
      boxShadow: theme.shadows[8],
    },
  },
  modalTop: {
    backgroundColor: '#222F47',
  },
  smallAvatar: {
    width: '60px',
    height: '60px',
  },
  name: {
    textAlign: 'center',
    lineHeight: '1.3125rem' /* fallback */,
    height: '1.3125rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    minHeight: '1.3125rem',
    '-webkit-line-clamp': 1 /* number of lines to show */,
    '-webkit-box-orient': 'vertical',

    [theme.breakpoints.up('sm')]: {
      lineHeight: '1.3125rem' /* fallback */,
      height: '2.625rem',
      minHeight: '1.3125rem',
      '-webkit-line-clamp': 2 /* number of lines to show */,
    },

    [theme.breakpoints.up('md')]: {
      lineHeight: '1.5rem' /* fallback */,
      height: '3rem',
      minHeight: '1.5rem',
    },
  },

  modal: {
    color: theme.palette.common.white,
    width: '45vw',
    height: 'auto',
    backgroundColor: '#14223C',
    position: 'fixed',
    top: '12%',
    left: '50%',
    transform: 'translate(-50%, -10%)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 1, 3),
    '& a': {
      color: theme.palette.common.white,
    },
  },
  navButton: {
    backgroundColor: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.common.white,
    },
    width: 44,
    height: 44,
  },
  navIcon: {
    width: 44,
    height: 44,
  },
  navGridItem: {
    display: 'flex',
    alignItems: 'normal',
  },
  closeModalButton: {
    marginRight: 5,
    color: theme.palette.common.white,
  },
  cardRoot: {
    '&:hover': {
      boxShadow:
        '0px 16px 24px rgba(0, 0, 0, 0.03), 0px 6px 30px rgba(0, 0, 0, 0.04), 0px 8px 10px rgba(0, 0, 0, 0.08)',
    },
  },
  cardActionRoot: {
    display: 'flex',
    '&:hover $focusHighlight': {
      opacity: 0,
    },
  },
  focusHighlight: {},
  modalBg: {
    background: '#222F47',
    padding: '0 2.5vw',
    marginTop: '-18px',
    width: 'calc(100% + 16px)',
    marginLeft: '-8px',
  },
  [theme.breakpoints.down('lg')]: {
    modal: {
      width: '56vw',
    },
  },
  [theme.breakpoints.down('md')]: {
    modal: {
      width: '70vw',
    },
    '@global': {
      '.MuiGrid-spacing-xs-1 > .MuiGrid-item': {
        padding: '0px !important',
      },
    },
    '.MuiGrid-spacing-xs-1': {
      width: 'calc(97% + 3px) !important',
    },
  },
  [theme.breakpoints.down('sm')]: {
    medium: {
      width: '56px',
      height: '56px',
    },
    avatarBoxXs: {
      display: 'flex',
      alignItems: 'center',
      padding: '0',
    },
    modal: {
      width: '90vw',
    },
    '@global': {
      '.MuiGrid-spacing-xs-4 > .MuiGrid-item': {
        padding: '6px 5vw !important',
      },
      '.MuiGrid-spacing-xs-1': {
        width: 'calc(97% + 0px) !important',
      },
    },
  },
  '@global': {
    '.MuiInputBase-input': {
      fontWeight: 400,
      fontFamily: 'Poppins',
      fontSize: '16px',
    },
    '.MuiGrid-spacing-xs-1 > .MuiGrid-item': {
      padding: '6px',
    },
    '.MuiGrid-spacing-xs-1': {
      width: 'calc(100% + 5px)',
    },
  },
}))

export default function Directory({ items, variant }) {
  const classes = useStyles()
  const router = useRouter()
  const [open, setOpen] = useState(null)
  const [state, setState] = useState({
    expand: false,
    viewLabel: 'View more',
    itemsTS: items.slice(0, 8),
  })
  const { expand, viewLabel, itemsTS } = state
  useEffect(() => {
    setState({ ...state, itemsTS: items.slice(0, 8) })
  }, [items])

  const clickItem = (slug) => {
    const clickedItem = items.filter((item) => item.slug == slug)[0]
    setOpen(clickedItem)
  }

  //   const clickNext = () => {
  //     const currentItemIndex = items.findIndex(
  //       (item) => item.sys.id == open.sys.id
  //     )
  //     let next = items
  //       .slice(currentItemIndex + 1, items.length)
  //       .find((item) => item)
  //     if (!next) {
  //       next = items.find((item) => item)
  //     }
  //     setOpen(next)
  //   }

  //   const clickPrevious = () => {
  //     const currentItemIndex = items.findIndex(
  //       (item) => item.sys.id == open.sys.id
  //     )
  //     let previous = null
  //     for (let i = currentItemIndex - 1; i > -1; i--) {
  //       if (previous) break
  //       if (items[i]) {
  //         previous = items[i]
  //       }
  //     }

  //     if (!previous) {
  //       for (let i = items.length - 1; i > -1; i--) {
  //         if (previous) break
  //         if (items[i]) {
  //           previous = items[i]
  //         }
  //       }
  //     }
  //     setOpen(previous)
  //   }

  return (
    <Box mb={10} className={classes.root}>
      <Grid container spacing={3}>
        {itemsTS.map((subitem, i) => {
          const avatarTitle =
            subitem?.firstName && subitem?.lastName
              ? subitem?.firstName + ' ' + subitem?.lastName
              : subitem?.title

          return (
            <Grid item key={i} xs={12} sm={4} md={3}>
              <Card
                variant='outlined'
                className={classes.cardRoot}
                style={{ borderRadius: '8px' }}
              >
                <CardActionArea
                  classes={{
                    root: classes.cardActionRoot,
                    focusHighlight: classes.focusHighlight,
                  }}
                  onClick={
                    variant == 'affiliate'
                      ? () => clickItem(subitem.slug)
                      : undefined
                  }
                  href={variant !== 'affiliate' ? subitem.slug : null}
                >
                  <CardContent>
                    <Box p={2} className={classes.avatarBoxXs}>
                      <Box
                        mb={[0, 1]}
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                      >
                        <Avatar
                          alt={subitem.alt}
                          src={subitem.mediaImg}
                          className={classes.medium}
                        />
                      </Box>
                      <Box
                        mt={[0, 3]}
                        ml={[2, 0]}
                        className={classes.name}
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                      >
                        <TextStyle variant='h5'>{avatarTitle}</TextStyle>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        })}
      </Grid>

      {items.length > 8 && (
        <Box my={2}>
          <Button
            endIcon={
              expand ? <ExpandLessIcon /> : <img src='/images/expandmore.svg' />
            }
            onClick={() =>
              setState((prevState) => ({
                expand: !prevState.expand,
                viewLabel: prevState.expand ? 'View more' : 'View less',
                itemsTS:
                  prevState.itemsTS.length > 8 ? items.slice(0, 8) : items,
              }))
            }
          >
            <TextStyle variant='h5'>{viewLabel}</TextStyle>
          </Button>
        </Box>
      )}
      {/* <Modal
        open={open}
        onClose={() => setOpen(null)}
        aria-labelledby={`item-modal-${open?.fields.title}`}
        aria-describedby={`item-modal-description-${open?.fields.title}`}
      >
        <div className={classes.modal}>
          <Grid container className={classes.modalBg} spacing={3}>
            <Grid item xs={12} style={{ marginLeft: '-2.5vw' }}>
              <Box display='flex' alignItems='center'>
                <IconButton
                  aria-label='Close modal button'
                  className={classes.closeModalButton}
                  size='large'
                >
                  <CloseIcon size='small' onClick={() => setOpen(null)} />
                </IconButton>
                <Typography variant='body1'>
                  ASCD Affiliate Directory
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                display='flex'
                alignItems='center'
                pb={3}
                style={{ paddingBottom: '0px' }}
              >
                <Box pr={2}>
                  <Avatar
                    alt={
                      open?.fields.thumbnail?.fields?.imageContentful?.fields
                        .title
                    }
                    src={
                      open?.fields?.thumbnail?.fields?.imageBynder
                        ? open?.fields?.thumbnail?.fields?.imageBynder[0]?.src +
                          '?' +
                          imageoptimization.qualityParameter +
                          '=' +
                          imageoptimization.qualityValue
                        : open?.fields?.thumbnail?.fields?.imageContentful
                            ?.fields?.file?.url +
                          '?' +
                          imageoptimization.qualityParameter +
                          '=' +
                          imageoptimization.qualityValue
                    }
                    className={classes.smallAvatar}
                  />
                </Box>
                <Box>
                  <Typography
                    variant='h5'
                    id={`item-modal-${open?.fields.slug}`}
                  >
                    {open?.fields.title + ' ASCD'}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box>
                {documentToReactComponents(open?.fields.description, options)}
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={1} className={classes.navGridItem}>
              {items.length > 1 && (
                <IconButton
                  aria-label='go to previous item'
                  className={classes.navButton}
                  onClick={() => clickPrevious()}
                  size='large'
                >
                  <NavigateBeforeIcon className={classes.navIcon} />
                </IconButton>
              )}
            </Grid>
            <Grid item xs={10}>
              <Box mt={2} className={classes.body}>
                <Box id={`chapter-modal-description-${open?.fields.slug}`}>
                  <Box pt={2}>
                    {documentToReactComponents(
                      open?.fields.contactInfo,
                      options
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={1} className={classes.navGridItem}>
              {items.length > 1 && (
                <IconButton
                  aria-label='go to next item'
                  className={classes.navButton}
                  onClick={() => clickNext()}
                  size='large'
                >
                  <NavigateNextIcon className={classes.navIcon} />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </div>
      </Modal> */}
    </Box>
  )
}
