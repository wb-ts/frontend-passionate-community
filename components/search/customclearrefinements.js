import React from 'react'
import { connectCurrentRefinements } from 'react-instantsearch-dom'
import { makeStyles } from '@material-ui/core/styles'

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
