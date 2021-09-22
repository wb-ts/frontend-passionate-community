import React from 'react'
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import useSWR, { mutate } from 'swr'
import axios from 'axios'
import DashboardNote from '@/components/molecules/dashboardnote'
import NoAnnotations from '@/components/atoms/noannotations'

const useStyles = makeStyles((theme) => ({
  root: {},
  list: {
    width: 375,
  },
  closeModalButton: {
    marginRight: 5,
  },
}))

export default function DashboardAnnotations({ userId, open, toggleOpen }) {
  const classes = useStyles()

  const fetcher = (url) => axios.get(url).then((res) => res.data)

  const { data: annotations } = useSWR(
    `/api/get-annotations-by-userid?userId=${userId}`,
    fetcher
  )

  const deleteAnnotations = async (contentId) => {
    try {
      const res = await fetch(
        `/api/delete-annotations-by-articleid?contentId=${contentId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
          }),
        }
      )
      const json = await res.json()

      mutate(
        `/api/get-annotations-by-contentid?userId=${userId}&contentId=${contentId}`
      )
      mutate(`/api/get-annotations-by-userid?userId=${userId}`)
      mutate(
        `/api/get-deleteactions-by-contentid?userId=${userId}&contentId=${contentId}`
      )

      if (!res.ok) throw Error(json.message)
    } catch (e) {
      throw Error(e.message)
    }
  }

  return (
    <Drawer anchor='right' open={open} onClose={toggleOpen(false)}>
      <div
        className={classes.list}
        role='presentation'
        onClick={toggleOpen(false)}
        onKeyDown={toggleOpen(false)}
      >
        <Box display='flex' alignItems='center' p={2}>
          <IconButton
            aria-label='Close notes and annotations dashboard button'
            className={classes.closeModalButton}
          >
            <CloseIcon size='small' onClick={() => toggleOpen(false)} />
          </IconButton>
          <Typography variant='h5'>Notes & Highlights</Typography>
        </Box>
        <Divider />
        <List>
          {annotations?.length > 0 ? (
            annotations.map((notes, key) => {
              return (
                <DashboardNote
                  notes={notes}
                  key={key}
                  deleteAction={(contentId) => deleteAnnotations(contentId)}
                />
              )
            })
          ) : (
            <NoAnnotations message='Go to an article and start by highlighting some text.' />
          )}
        </List>
      </div>
    </Drawer>
  )
}
