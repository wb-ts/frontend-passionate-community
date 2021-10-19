import React, { useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import { makeStyles } from '@material-ui/core/styles'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote'
import EditIcon from '@material-ui/icons/Edit'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import VisibilityIcon from '@material-ui/icons/Visibility'
import DeleteIcon from '@material-ui/icons/Delete'
import Image from 'material-ui-image'
import DaysAgo from '@/components/atoms/DaysAgo'
import { useRouter } from 'next/router'
import paths from '@/paths/path'

const useStyles = makeStyles((theme) => ({
  media: {
    marginRight: theme.spacing(1),
    height: 70,
    width: 70,
  },
  noteItem: {
    '& *': {
      color: theme.palette.common.black,
    },
  },
  icon: {
    fontSize: theme.typography.pxToRem(16),
    marginRight: '4px',
  },
  noteCount: {
    backgroundColor: '#D6ECFF',
    padding: '0px 4px',
  },
  highlightCount: {
    backgroundColor: '#FEF7AC',
    padding: '0px 4px',
  },
  noteTitle: {
    lineHeight: theme.typography.pxToRem(18),
  },
  moreBtn: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  confirmText: {
    color: theme.palette.common.black,
  },
  deleteBtn: {
    color: theme.palette.primary.main,
  },
}))

export default function DashboardNote({ notes, key, deleteAction }) {
  const classes = useStyles()
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState(null)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] =
    React.useState(false)

  const confirmDelete = (e) => {
    e.stopPropagation()
    setAnchorEl(null)
    setOpenDeleteConfirmation(true)
  }

  const handleClose = () => {
    setOpenDeleteConfirmation(false)
  }

  const clickMoreOptions = (e) => {
    e.stopPropagation()
    setAnchorEl(e.target)
  }

  const closePopover = (e) => {
    e.stopPropagation()
    setAnchorEl(null)
  }

  const clickDeleteNote = () => {
    deleteAction(notes.contentId)
  }

  return (
    <Box key={key} display='flex'>
      <ListItem
        button
        className={classes.noteItem}
        onClick={() => router.push(paths.article({ slug: notes.contentSlug }))}
      >
        <ListItemAvatar className={classes.media}>
          {notes.contentImageSrc ? (
            <Image
              src={notes.contentImageSrc}
              style={{ width: '100%', height: '100%' }}
              imageStyle={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Skeleton
              variant='rect'
              width={'100%'}
              height={'100%'}
              animation={false}
            />
          )}
        </ListItemAvatar>
        <Box>
          <Typography variant='body2' className={classes.noteTitle}>
            {notes.contentTitle}
          </Typography>
          <Box display='flex' my={1}>
            <Box
              display='flex'
              alignItems='center'
              mr={1}
              className={classes.noteCount}
            >
              <FormatQuoteIcon className={classes.icon} /> {notes.notesCount}
            </Box>
            <Box
              display='flex'
              alignItems='center'
              mr={1}
              className={classes.highlightCount}
            >
              <EditIcon className={classes.icon} />
              {notes.totalCount - notes.notesCount}
            </Box>
            <Box>
              <DaysAgo input={notes.updatedAt} />
            </Box>
          </Box>
        </Box>
      </ListItem>
      <IconButton
        aria-label='more options for this annotation'
        className={classes.moreBtn}
        onClick={(e) => clickMoreOptions(e)}
      >
        <MoreVertIcon fontSize='small' />
      </IconButton>
      <Popover
        id='more-options-for-note'
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
        <List component='nav' aria-label='Note action options'>
          <ListItem
            button
            onClick={() =>
              router.push(paths.article({ slug: notes.contentSlug }))
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
            You will delete all of the notes and highlights associated with this
            article.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCEL</Button>
          <Button onClick={clickDeleteNote} className={classes.deleteBtn}>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
