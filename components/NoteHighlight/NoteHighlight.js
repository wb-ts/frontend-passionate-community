import React, { useState } from 'react'
import { Grid, Button, IconButton, List, ListItem, Box, ListItemIcon, ListItemText, Typography, Popover, 
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import VisibilityIcon from '@material-ui/icons/Visibility'
import DeleteIcon from '@material-ui/icons/Delete'
import Image from 'material-ui-image'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'
import EditIcon from '@material-ui/icons/Edit'
import { makeStyles } from '@material-ui/core/styles'
import DaysAgo from '../../components/atoms/DaysAgo'
import { useRouter } from 'next/router'
import paths from '../../paths/path'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  containerListItem: {
    spacing: 0,
  },
  containgerImage: {
    width: 198,
  },
  image: {
    borderRadius: 4,
  },
  containerListItemInfo: {
    heigh: 125,
    display: 'flex',
    direction: 'column',
  },
  containerRow: {
    direction: 'row',
    justifyContent: 'space-between',
  },
  containerAnnotationCount: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  icon: {
    fontSize: theme.typography.pxToRem(20),
  },
  moreBtn: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  annotationCount: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 63,
    height: 28,
    backgroundColor: '#D6ECFF',
    borderRadius: 2,
  },
  highlightCount: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing(2),
    width: 64,
    height: 22,
    backgroundColor: '#FEF7AC',
    borderRadius: 2,
  },
  lastView: {
    width: 270,
    height: 22,
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
  },
  annotationTitleButton: {
    padding: '0px !important',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  annotationTitle: {
    lineHeight: theme.typography.pxToRem(28),
  },
  confirmText: {
    color: theme.palette.common.black,
  },
  deleteBtn: {
    color: theme.palette.primary.main,
  },
}))

export default function AnnotationItem({ annotation, deleteAction }) {
  const classes = useStyles()
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState(null)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)

  const closePopover = (e) => {
    e.stopPropagation()
    setAnchorEl(null)
  }

  const clickMoreOptions = (e) => {
    e.stopPropagation()
    setAnchorEl(e.target)
  }

  const confirmDelete = (e) => {
    e.stopPropagation()
    setAnchorEl(null)
    setOpenDeleteConfirmation(true)
  }

  const handleClose = () => {
    setOpenDeleteConfirmation(false)
  }

  const deleteClicked = () => {
    handleClose()
    deleteAction(annotation.contentId)
  }

  return (
    <>
      <Box
        className={classes.root}
      >
        <Grid container spacing={classes.containerListItem}>
          <Grid item xs={3} >
            <Box className={classes.containgerImage}>
              {annotation.contentImageSrc ? (
                <Image style={{ paddingTop: 'calc(63.1%)' }}
                  className={classes.image}
                  src={annotation.contentImageSrc}
                />
              ) : (
                <Skeleton
                  variant='rect'
                  animation={false}
                />
              )}
            </Box>
          </Grid>
          <Grid iitem xs={12} sm container className={classes.containerListItemInfo}>
            <Grid item xs container className={classes.containerRow} style={{ marginBottom: 28 }}>
              <Grid item xs>
                <Button fullWidth className={classes.annotationTitleButton} 
                  onClick={() => router.push(paths.article({ slug: annotation.contentSlug }))}
                >
                  <Typography align='left' variant='h4' className={classes.annotationTitle}>
                    {annotation.contentTitle}
                  </Typography>
                </Button>
              </Grid>
              <Grid item>
                <IconButton
                  aria-label='more options for this annotation'
                  className={classes.moreBtn}
                  onClick={(e) => clickMoreOptions(e)}
                >
                  <MoreVertIcon size='small' />
                </IconButton>
                <Popover
                  id='more-options-for-annotation'
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={(e) => closePopover(e)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <List component='nav' aria-label='Annotation action options'>
                    <ListItem
                      button
                      onClick={() =>
                        router.push(paths.article({ slug: annotation.contentSlug }))
                      }
                    >
                      <ListItemIcon>
                        <VisibilityIcon />
                      </ListItemIcon>
                      <ListItemText primary='View' />
                    </ListItem>
                    <ListItem button onClick={(e) => confirmDelete(e)}>
                      <ListItemIcon>
                        <DeleteIcon />
                      </ListItemIcon>
                      <ListItemText primary='Delete' />
                    </ListItem>
                  </List>
                </Popover>
              </Grid>
            </Grid>
            <Grid item container className={classes.containerRow}>
              <Grid item xs={5} container className={classes.containerAnnotationCount}>
                <Grid item className={classes.annotationCount}>
                  <FormatQuoteIcon />
                  <Typography variant='body3' style={{paddingLeft: '4px'}}>
                    {annotation.notesCount}
                  </Typography> 
                </Grid>
                <Grid item className={classes.highlightCount}>
                  <EditIcon className={classes.icon} />
                  <Typography variant='body3' style={{paddingLeft: '4px'}}>
                    {annotation.totalCount - annotation.notesCount}
                  </Typography> 
                </Grid>
              </Grid>
              <Grid item xs={7} className={classes.lastView}>
                <Typography variant='body3' style={{paddingRight: '4px'}}>Last viewed</Typography>
                <DaysAgo input={annotation.updatedAt} variant='body3' />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        open={openDeleteConfirmation}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            className={classes.confirmText}
          >
            You will delete all of the notes and highlights associated with this article.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCEL</Button>
          <Button onClick={deleteClicked} className={classes.deleteBtn}>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}