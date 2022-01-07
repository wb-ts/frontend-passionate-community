import React, { useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { options } from '../../const'

const useStyles = makeStyles((theme) => ({
  accordion: {
    backgroundColor: theme.palette.grey.extraLight,
    boxShadow: 'none',
    '& > *:first-child': {
      borderRadius: '4px',
    },
    '& > *:last-child': {
      borderRadius: '0 0 4px 4px',
    },
    '&.Mui-expanded': {
      '& > *:first-child': {
        borderRadius: '4px 4px 0 0',
      },
    },
    '& .MuiButton-endIcon': {
      marginLeft: 0,
    },
    '& .MuiButton-endIcon svg path': {
      fill: theme.palette.primary.main,
    },
  },
  verticalCenter: {
    height: '100%',
    alignContent: 'center',
    padding: 0,
    '& .MuiAccordionSummary-content': {
      margin: '24px 16px',
      '& .MuiBox-root': {
        marginLeft: 0,
      },
      [theme.breakpoints.up('sm')]: {
        margin: '28px 32px 24px',
      },
    },
    '& .MuiAccordionSummary-expandIcon': {
      marginRight: '24px',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      '& .MuiAccordionSummary-expandIcon': {
        width: '100%',
        backgroundColor: theme.palette.background.main,
        padding: '0',
        borderRadius: '0 0 4px 4px!important',
      },
      '& .MuiAccordionSummary-expandIcon .MuiIconButton-label': {
        width: '100%',
      },
      '& .MuiAccordionSummary-expandIcon .MuiIconButton-label .MuiBox-root': {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginRight: 0,
      },
    },
  },
  more: {
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '32px',
    letterSpacing: '0.2px',
  },
  answer: {
    backgroundColor: theme.palette.background.main,
  },
  answerA: {
    marginTop: 4,
    fontSize: '200%',
    marginRight: '29px',
    fontWeight: '700 !important',
    alignItems: 'center',
  },
  '@global': {
    '.MuiAccordionSummary-content .MuiTypography-h5': {
      fontWeight: 'normal',
    },
    '.MuiAccordion-root': {
      backgroundColor: theme.palette.background.main,
    },
    '.MuiAccordionSummary-root': {
      backgroundColor: theme.palette.grey.extraLight,
      minHeight: '120px !important',
    },
    '.MuiGrid-grid-xs-true > p': {
      marginTop: '0px',
    },
    '.MuiAccordionDetails-root': {
      padding: '12px 24px 12px',
      [theme.breakpoints.up('sm')]: {
        padding: '32px 32px 24px',
      },
    },
  },
}))

export default function AccordionFAQ({
  expanded,
  id,
  collapseText,
  expandText,
  item,
}) {
  const classes = useStyles()
  const [expand, setExpand] = useState(expanded)
  const handleChange = (panel) => (event, isExpanded) => {
    setExpand(isExpanded ? panel : false)
  }
  return (
    <Accordion
      className={classes.accordion}
      onChange={handleChange(`panel${id}`)}
      expanded={expand == `panel${id}`}
    >
      <AccordionSummary
        expandIcon={
          expand == `panel${id}` ? (
            <Box px={1}>
              <Button endIcon={<ExpandLess />}>
                <Typography noWrap className={classes.more}>
                  {collapseText}
                </Typography>
              </Button>
            </Box>
          ) : (
            <Box px={1}>
              <Button endIcon={<ExpandMore />}>
                <Typography noWrap className={classes.more}>
                  {expandText}
                </Typography>
              </Button>
            </Box>
          )
        }
        aria-controls={`panel${id}-content`}
        id={`panel${id}-header`}
        className={classes.verticalCenter}
        IconButtonProps={{
          disableRipple: true,
          style: {
            transform: 'none',
            transition: 'none',
            borderRadius: 0,
          },
        }}
      >
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          style={{ width: '100%' }}
        >
          <Box className={classes.titleMain}>
            <Grid container wrap='nowrap'>
              <Grid item>
                <Typography variant='h5' className={classes.answerA}>
                  {'Q '}
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography variant='h5'>{item.title}</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box className={classes.answer}>
          <Grid container wrap='nowrap'>
            <Grid item>
              <Typography variant='h5' className={classes.answerA}>
                {'A '}
              </Typography>
            </Grid>
            <Grid item xs>
              {documentToReactComponents(item.details, options)}
            </Grid>
          </Grid>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
