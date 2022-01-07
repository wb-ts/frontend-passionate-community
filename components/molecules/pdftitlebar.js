import React from 'react'
import { Box } from '@mui/material'
import TextStyle from '../atoms/TextStyle'

export default function PdfTitleBar({ title, volume, number, issueDate }) {
  return (
    <Box>
      <TextStyle component='h1' variant='h1'>
        {title}
      </TextStyle>
      <Box mt={5}>
        <TextStyle variant='h5'>
          Volume {volume}, Number {number}, {issueDate}
        </TextStyle>
      </Box>
    </Box>
  )
}
