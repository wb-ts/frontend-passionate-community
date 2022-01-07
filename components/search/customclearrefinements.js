import React from 'react'
import { makeStyles } from '@mui/styles'
import { connectCurrentRefinements } from 'react-instantsearch-dom'

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.primary,
  },
}))

const ClearRefinements = ({ items, refine }) => {
  const classes = useStyles()

  return (
    <>
      {items.length ? (
        <a
          href='javascript:void(0)'
          className={classes.link}
          onClick={() => refine(items)}
          disabled={!items.length}
        >
          Clear all
        </a>
      ) : null}
    </>
  )
}

export const CustomClearRefinements =
  connectCurrentRefinements(ClearRefinements)
