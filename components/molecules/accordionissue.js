import React from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import options from '@/const/options'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CtaButton from '@/components/atoms/ctabutton'
import TextStyle from '@/components/atoms/textstyle'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'

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
      marginRight: 0,
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      '& .MuiAccordionSummary-expandIcon': {
        width: '100%',
        backgroundColor: theme.palette.background.main,
        padding: '12px 16px',
        borderRadius: '0 0 4px 4px!important',
      },
      '& .MuiAccordionSummary-expandIcon .MuiIconButton-label': {
        width: '100%',
      },
      '& .MuiAccordionSummary-expandIcon .MuiIconButton-label .MuiBox-root': {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
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
      padding: '0 24px 18px',
      [theme.breakpoints.up('sm')]: {
        padding: '18px 32px 24px',
      },
    },
  },
}))

export default function AccordionIssue({ handleChange, expanded, id, item }) {
  const classes = useStyles()

  return (
    <Accordion
      className={classes.accordion}
      onChange={handleChange(`panel${id}`)}
      expanded={expanded == `panel${id}`}
    >
      <AccordionSummary
        expandIcon={
          <Box mr={4}>
            {expanded == `panel${id}` ? (
              <Button endIcon={<ExpandLess />} style={{ marginRight: 10 }}>
                <Typography className={classes.more}>Less</Typography>
              </Button>
            ) : (
              <Button endIcon={<ExpandMore />} style={{ marginRight: 10 }}>
                <Typography className={classes.more}>More</Typography>
              </Button>
            )}
            <CtaButton
              variant='contained'
              color='primary'
              width='114'
              height='42'
              label='Submit'
              href='https://elmagazine.submittable.com/submit'
              target='_blank'
            />
          </Box>
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
          marginLeft={2}
        >
          <Box>
            <TextStyle variant='h4'>{item.title}</TextStyle>
            <TextStyle variant='subtitle1'>Deadline: {item.deadline}</TextStyle>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box>
          {/* <ReactMarkdown>{item.details}</ReactMarkdown> */}
          {documentToReactComponents(item.details, options)}
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
