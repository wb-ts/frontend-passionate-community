import React, { useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { options } from '../../const'
import TextStyle from '../atoms/TextStyle'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    lineHeight: '18px',
    letterSpacing: '0.3px',
  },
  expand: {
    display: 'block',
  },
  collapse: {
    display: 'none',
  },
  readMore: {
    '& .MuiBox-root': {
      marginTop: 8,
    },
  },
}))

export default function ReadMore({
  title,
  short,
  long,
  hideSummaryWhenExpanded = false,
  textAlign = 'center',
  ...props
}) {
  const classes = useStyles()

  const [state, setState] = useState({
    expand: false,
  })
  const { expand } = state

  const showReadMore =
    long ||
    (short &&
      short.nodeType &&
      short.content.filter((node) => node.nodeType == 'paragraph').length > 1)

  const firstParagraph = () => {
    if (short && typeof short !== 'string' && short.nodeType == 'document') {
      const doc = JSON.parse(JSON.stringify(short))
      const first = doc.content.find((node) => node.nodeType == 'paragraph')
      doc.content = [first]
      return doc
    }
    return null
  }

  const extraContent = () => {
    if (short && typeof short !== 'string' && short.nodeType == 'document') {
      return JSON.parse(JSON.stringify(short))
    }
    return null
  }

  const firstParagraphData = firstParagraph()

  const extraContentData = extraContent()

  return (
    <Box display='flex' flexDirection='column' textAlign={textAlign}>
      <TextStyle variant={props.titleVariant ? props.titleVariant : 'h5'}>
        {title}
      </TextStyle>
      <Box>
        {expand && hideSummaryWhenExpanded ? null : (
          <Box id='read-more-collapsed' className={classes.readMore}>
            <TextStyle variant='body1'>
              {short && typeof short == 'string'
                ? short
                : firstParagraphData?.content[0] !== undefined
                ? documentToReactComponents(firstParagraphData, options)
                : ''}
            </TextStyle>
          </Box>
        )}
        {expand && (
          <TextStyle variant='body1'>
            {typeof long == 'string'
              ? long
              : extraContentData.content[0] !== undefined
              ? documentToReactComponents(extraContentData, options)
              : ''}
          </TextStyle>
        )}
        {showReadMore && (
          <Box>
            <Button
              style={{ padding: '0', minHeight: 24 }}
              endIcon={
                expand ? (
                  <ExpandLessIcon style={{ color: '#005E47' }} />
                ) : (
                  <ExpandMoreIcon style={{ color: '#005E47' }} />
                )
              }
              onClick={() =>
                setState((prevState) => ({ expand: !prevState.expand }))
              }
            >
              <TextStyle variant='buttonLarge'>
                {expand ? 'Read less' : 'Read more'}
              </TextStyle>
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}
