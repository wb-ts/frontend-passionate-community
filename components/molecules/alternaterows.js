import React from 'react'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import TextStyle from '../atoms/TextStyle'

const useStyles = makeStyles((theme) => ({
  root: {},
  actionbar: {},
  infoRow: {
    backgroundColor: theme.palette.action.hover,
  },
}))

const _dataRow = (key, value, index, classes) => {
  return (
    <Box
      key={key}
      className={index % 2 ? '' : classes.infoRow}
      display='flex'
      justifyContent='space-between'
      p={2}
    >
      <TextStyle variant='h5'>{key}</TextStyle>
      <TextStyle variant='subtitle2'>{value}</TextStyle>
    </Box>
  )
}
export default function AlternateRows({ title, rows }) {
  const classes = useStyles()
  return (
    <>
      <Box mb={4}>
        <TextStyle variant='h3'>{title}</TextStyle>
      </Box>
      {Object.keys(rows[0]).map(function (key, index) {
        return _dataRow(key, rows[0][key], index, classes)
      })}
    </>
  )
}
