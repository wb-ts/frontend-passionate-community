import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import options from '@/const/options'
import TextStyle from '../textstyle'

const useStyles = makeStyles((theme) => ({
  root: {},
  side: {
    minWidth: '62px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    textAlign: 'center',
    '& *': {
      fontWeight: 700,
    },
  },
  body: {
    backgroundColor: (props) =>
      props.background ? props.background : theme.palette.common.white,
  },
  title: {
    fontSize: theme.typography.pxToRem(22),
    fontWeight: 700,
  },
}))

export default function CalloutBlock({ sidelabel, title, body, ...props }) {
  const classes = useStyles(props) // Optional props: background

  return (
    <Box display='flex'>
      <Box className={classes.side} pt={2}>
        {sidelabel && <Typography variant='body1'>{sidelabel}</Typography>}
      </Box>
      <Box className={classes.body} p={3}>
        {title && (
          <Box mb={2}>
            <TextStyle color='#005E47' variant='h3'>
              {title}
            </TextStyle>
          </Box>
        )}
        <TextStyle variant='body1'>
          {documentToReactComponents(body, options)}
        </TextStyle>
      </Box>
    </Box>
  )
}

CalloutBlock.propTypes = {
  sidelabel: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  background: PropTypes.string,
}
