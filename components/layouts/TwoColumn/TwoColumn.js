import React from 'react'
import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types'

/**
 * Basic two column layout. Centers content on left. Becomes a single column in mobile.
 *
 * @param {Component} left
 * @param {Component}  right
 * @returns {Component}
 */
const TwoColumn = ({ left, right }) => {
  const theme = useTheme()
  return (
    <Grid container alignItems='center' spacing={5}>
      <Grid
        item
        xs={12}
        md={5}
        sx={{ justifyContent: 'center', display: 'flex' }}
      >
        {left && left}
      </Grid>
      <Grid
        item
        xs={12}
        md={7}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(1),
          },
        }}
      >
        {right && right}
      </Grid>
    </Grid>
  )
}

export default TwoColumn

TwoColumn.propTypes = {
  left: PropTypes.element,
  right: PropTypes.element,
}
