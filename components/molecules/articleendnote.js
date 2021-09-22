import React from 'react'
import { Box, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import TextStyle from '@/components/atoms/textstyle'

const useStyles = makeStyles((theme) => ({
  root: {
    '& blockquote': {
      marginInlineStart: 0,
      marginInlineEnd: 0,
    },
  },
  divider: {
    backgroundColor: theme.palette.common.black,
  },
}))

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (children.length == 1 && children[0] == '') {
        return null
      }
      return (
        <Box my={2} display='flex'>
          <Box mr={1}>•</Box> <TextStyle variant='body2'>{children}</TextStyle>
        </Box>
      )
    },
  },
  renderText: (text) => {
    if (text == '<SUPSCRPT>') {
      return null
    } else if (text == '</SUPSCRPT>') {
      return null
    } else if (text.indexOf('<SUPSCRPT>') > 0) {
      let cleanedText = ''

      cleanedText = text.replace(/<\/SUPSCRPT>/g, '')

      return cleanedText
        .split('<SUPSCRPT>')
        .reduce((children, textSegment, index) => {
          return [
            ...children,
            index > 0 && <sup>{textSegment[0]}</sup>,
            textSegment.slice(1),
          ]
        }, [])
    } else {
      return text.split('\n').flatMap((text, i) => [i > 0 && <br />, text])
    }
  },
}

export default function ArticleEndnote({ title, notes }) {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Box mb={2}>
        <TextStyle variant='h5'>{title}</TextStyle>
      </Box>

      <Divider className={classes.divider} />

      <Box mx={2} mt={1}>
        {documentToReactComponents(notes, options)}
      </Box>
    </Box>
  )
}
