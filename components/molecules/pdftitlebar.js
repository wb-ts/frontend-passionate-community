import React from 'react'
import { Box } from '@material-ui/core'
import TextStyle from '@/components/atoms/textstyle'

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
