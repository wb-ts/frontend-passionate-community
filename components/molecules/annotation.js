import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import dateFormat from 'dateformat'
import TextStyle from '../atoms/TextStyle'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  highlight: {
    backgroundColor: theme.palette.background.main,
    padding: '10px',
    fontSize: '15px',
    lineHeight: '17px',
    letterSpacing: '0.2px',
    fontWeight: 600,
  },
  number: {
    width: 22,
    height: 22,
    borderRadius: 10,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 700,
    textAlign: 'center',
  },
  active: {
    border: `1px solid ${theme.palette.primary.main}`,
  },
  textfieldInput: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
    lineHeight: theme.typography.pxToRem(24),
    letterSpacing: 0.2,
  },
  confirmText: {
    color: theme.palette.common.black,
  },
}))

export default function Annotation({
  id,
  number,
  highlightedText,
  notes,
  date,
  saveAction,
  updateAction,
  cancelAction,
  deleteAction,
  viewAction,
  active = false,
  isUpdate,
}) {
  const classes = useStyles()

  const [note, setNote] = useState('')
  const [editing, setEditing] = useState(false)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] =
    React.useState(false)

  const inputRef = React.useRef()

  useEffect(() => {
    if (notes && notes !== '') {
      setNote(notes)
    }
  }, [notes])

  useEffect(() => {
    if (!id) {
      const timeout = setTimeout(() => {
        inputRef.current.focus()
      }, 100)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [id])

  const cancelClicked = () => {
    setEditing(false)
    cancelAction()
  }

  const saveClicked = () => {
    setEditing(false)
    if (editing) {
      updateAction(id, note)
    } else {
      saveAction(note)
    }
  }

  const deleteClicked = () => {
    handleClose()
    setEditing(false)
    deleteAction(id)
  }

  const confirmDelete = (e) => {
    setOpenDeleteConfirmation(true)
  }

  const handleClose = () => {
    setOpenDeleteConfirmation(false)
  }

  return (
    <>
      <Paper
        square
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box display='flex'>
            <Box className={classes.number} mr={2}>
              <Typography variant='button'>{number}</Typography>
            </Box>
            <Box>
              <Typography variant='body2' className={classes.date}>
                {dateFormat(date, 'mmmm d, yyyy')}
              </Typography>
            </Box>
          </Box>
          {id && (
            <Box display='flex' justifyContent='flex-end' my={1}>
              <Button
                size='small'
                style={{ marginRight: 1, minWidth: 50 }}
                onClick={(e) => confirmDelete(e)}
              >
                Delete
              </Button>
              <Button
                size='small'
                onClick={() => setEditing(true)}
                style={{ minWidth: 50 }}
              >
                Edit
              </Button>
            </Box>
          )}
        </Box>
        <Box my={2}>
          <Button
            style={{ textTransform: 'none' }}
            onClick={() => viewAction(id)}
          >
            <TextStyle variant='body3' className={classes.highlight}>
              {highlightedText}
            </TextStyle>
          </Button>
        </Box>
        <Divider />
        <Box p={1}>
          <TextField
            id={`note-${id ? id : 'temp'}`}
            placeholder='Write a note'
            disabled={!editing && id && !isUpdate}
            multiline
            maxRows={4}
            InputProps={{
              disableUnderline: true,
              classes: { root: classes.textfieldInput },
            }}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            fullWidth
            inputRef={inputRef}
            autoFocus
            // classes={{ root: classes.textfieldInput }}
          />
        </Box>
        {(!id || editing || isUpdate) && (
          <>
            <Divider />
            <Box display='flex' justifyContent='flex-end' my={1}>
              <Button
                variant='outlined'
                color='primary'
                style={{ marginRight: 15 }}
                onClick={() => cancelClicked()}
              >
                Cancel
              </Button>

              <Button
                variant='contained'
                color='primary'
                disabled={note == ''}
                onClick={() => saveClicked()}
              >
                Save
              </Button>
            </Box>
          </>
        )}
      </Paper>
      <Dialog
        open={openDeleteConfirmation}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            className={classes.confirmText}
          >
            Are you sure you want to delete this note?
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
