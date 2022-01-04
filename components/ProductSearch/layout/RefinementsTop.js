import React from 'react'
import { Grid, Box } from '@mui/material'
import { CustomClearFilters, CustomSearchBox } from '../plugins'
/**
 * Layout filters top, contents below
 * @param {Component} Refinements top
 * @param {Component} Content below
 * @returns {Component}
 */
const RefinementsTop = ({ Refinements, Content }) => {
  return (
    <Box>
      <Box
        display='flex'
        flexDirection='row'
        flexWrap='wrap'
        justifyContent='center'
        alignItems='center'
      >
        <Box>{Refinements}</Box>
        <Box mt={2} textAlign='center'>
          <CustomSearchBox
            customWidth={200}
            translations={{ placeholder: 'Search for products' }}
          />
        </Box>
        <Box>
          <CustomClearFilters keepFilters={['workshopDateTimeStamp']} />
        </Box>
      </Box>
      <Box>{Content}</Box>
    </Box>
  )
}
export default RefinementsTop
