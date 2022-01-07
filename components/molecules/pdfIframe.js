import React, { useRef, useState } from 'react'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import TextStyle from '../atoms/TextStyle'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '800px',
    width: '100%',
    backgroundColor: theme.palette.grey.extraLight,
  },
  ribbon: {
    width: '100%',
    height: '76px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  icon: {
    color: theme.palette.common.white,
    margin: theme.spacing(1.5),
  },
  title: {
    fontWeight: 400,
  },
  subline: {
    fontWeight: 700,
  },
}))

export default function PdfIframe({ title, pdf }) {
  const classes = useStyles()
  const [iframeTimeoutId, setIframeTimeoutId] = useState(undefined)
  const iframeRef = useRef(null)
  const pdfUrl = pdf.startsWith('//') ? pdf.substring(2) : pdf
  const url = 'https://docs.google.com/gview?embedded=true&url=' + pdfUrl
  // const/ url = 'https://' + pdfUrl

  // useEffect(() => {
  //   const intervalId = setInterval(updateIframeSrc, 3000)
  //   setIframeTimeoutId(intervalId)
  // }, [])

  function iframeLoaded() {
    clearInterval(iframeTimeoutId)
  }

  function updateIframeSrc() {
    if (iframeRef.current) {
      iframeRef.current.data = url
    }
  }

  return (
    <Box className={classes.root}>
      <Box
        mt={5}
        px={3}
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        className={classes.ribbon}
      >
        <Box>
          <TextStyle variant='subtitle1'>{title}</TextStyle>
        </Box>
      </Box>
      <Box>
        {/* <object
          className={classes.root}
          type='application/pdf'
          data={url}
          // onLoad={iframeLoaded}
          // onError={updateIframeSrc}
          ref={iframeRef}
        ></object> */}
        <object className={classes.root} data={url}></object>
      </Box>
    </Box>
  )
}
