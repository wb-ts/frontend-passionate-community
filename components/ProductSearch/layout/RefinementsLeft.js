import React, { Component } from 'react'
import { Grid, Box } from '@mui/material'
import { CustomClearRefinements } from '../plugins'
/**
 * Layout filters left, contents right
 * @param {Component} Refinements left
 * @param {Component} Content right
 * @returns {Component}
 */
const RefinementsLeft = ({ Refinements, Content }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        {Refinements}
      </Grid>
      <Grid item xs={12} md={9}>
        <Box>
          <CustomClearRefinements />
        </Box>
        <Box>{Content}</Box>
      </Grid>
    </Grid>
  )
}
export default RefinementsLeft
