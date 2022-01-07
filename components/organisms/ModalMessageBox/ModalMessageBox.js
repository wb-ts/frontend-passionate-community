import React, { useState } from 'react'
import { DiscFull } from '@mui/icons-material'
import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Modal,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  modal: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.grey.dark,
    height: '35vh',
    width: '100vw',
    position: 'absolute',
    padding: theme.spacing(2, 4, 2, 4),
    overflowY: 'auto',
    [theme.breakpoints.up('md')]: {
      width: '60vw',
      maxWidth: 550,
      height: '35vh',
      top: '15%',
      left: '50%',
      transform: 'translate(-50%, -10%)',
      boxShadow: theme.shadows[5],
    },
  },
  closeModalButton: {
    marginRight: 5,
    color: theme.palette.grey.dark,
  },
  smallAvatar: {
    width: '60px',
    height: '60px',
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: '36px',
  },
  listItem: {
    margin: '0px 0px 4px 0px',
    padding: '0px',
  },
  listItemIcon: {
    minWidth: '16px',
  },
}))

export default function ModalMessageBox({
  openMessageBox,
  onMessageBoxClose,
  message,
  itemlist = [],
  ...restProps
}) {
  const classes = useStyles()

  return (
    <Modal
      open={openMessageBox}
      onClose={() => {
        openMessageBox = false
        onMessageBoxClose(openMessageBox)
      }}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      {...restProps}
    >
      <Box className={classes.modal}>
        <Box
          display='flex'
          alignItems='left'
          justifyContent='flex-end'
          mb={2}
          pl={2}
          pr={2}
        >
          <IconButton
            aria-label='Close modal button'
            className={classes.closeModalButton}
            size='large'
            onClick={() => {
              openMessageBox = false
              onMessageBoxClose(openMessageBox)
            }}
          >
            <CloseIcon size='small' />
          </IconButton>
        </Box>
        <Box display='flex'>
          <Box pr={2}>
            <Avatar className={classes.smallAvatar}>!</Avatar>
          </Box>
          <Box textAlign='left'>
            {message}
            {itemlist.length && (
              <List>
                {itemlist.map((item, key) => {
                  return (
                    <ListItem className={classes.listItem} key={key}>
                      <ListItemIcon className={classes.listItemIcon}>
                        •
                      </ListItemIcon>
                      {item}
                    </ListItem>
                  )
                })}
              </List>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
