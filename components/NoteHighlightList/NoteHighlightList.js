import React from 'react'
import { Grid, Box, List, Divider, Typography, ListItem } from '@mui/material'
import { makeStyles } from '@mui/styles'
import NoAnnotations from '../atoms/NoAnnotations'
import axios from 'axios'
import useSWR, { mutate } from 'swr'
import AnnotationItem from '../NoteHighlight/NoteHighlight'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    direction: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  captionBox: {
    width: '100%',
    height: '57px',
    backgroundColor: theme.palette.primary.main,
  },
  caption: {
    color: theme.palette.text.secondary,
    paddingTop: 16,
    paddingLeft: 24,
  },
  divider: {
    marginTop: 8,
    marginBottom: 8,
  },
}))

export default function Annotations({ userId }) {
  const noData = 'Go to an article and start by highlighting some text.'
  const captionLabel = 'Notes & Highlights'

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
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Box className={classes.captionBox}>
          <Typography variant='h5' className={classes.caption}>
            {captionLabel}
          </Typography>
        </Box>
        <List>
          {annotations?.length > 0 ? (
            annotations.map((annotation, index) => {
              return (
                <>
                  <ListItem>
                    <AnnotationItem
                      annotation={annotation}
                      deleteAction={(contentId) => deleteAnnotations(contentId)}
                    />
                  </ListItem>
                  {annotations[index + 1] !== undefined && (
                    <Divider variant='middle' className={classes.divider} />
                  )}
                </>
              )
            })
          ) : (
            <NoAnnotations message={noData} />
          )}
        </List>
      </Grid>
    </Grid>
  )
}
