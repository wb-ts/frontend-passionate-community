import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import FormatQuoteIcon from '@mui/icons-material/FormatQuote'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VisibilityIcon from '@mui/icons-material/Visibility'
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
} from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import { makeStyles } from '@mui/styles'
import paths from '../../paths/path'
import DaysAgo from '../atoms/DaysAgo'

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
  nextImage: {
    objectFit: 'cover',
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
              width={70}
              height={70}
              className={classes.nextImage}
              placeholder='blur'
              blurDataURL='/images/blurrImg.png'
            />
          ) : (
            <Skeleton
              variant='rectangular'
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
        size='large'
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
