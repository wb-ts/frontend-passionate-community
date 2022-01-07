import React, { useEffect, useState } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
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
import CtaButton from '../atoms/CtaButton'
import FilterDropdown from '../atoms/FilterDropdown'

const useStyles = makeStyles((theme) => ({
  accordion: {
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(2),
  },
  deadline: {
    fontStyle: 'italic',
    fontWeight: 700,
    paddingTop: '13px',
  },
  verticalCenter: {
    height: '100%',
    alignContent: 'center',
  },
  more: {
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '32px',
    letterSpacing: '0.2px',
    textDecoration: 'underline',
  },
}))

export default function FutureIssuesList({ issues }) {
  const [state, setState] = useState({
    yearFilter: [],
    topicFilter: [],
    expanded: false,
  })

  const [year, setYear] = useState('')
  const [topic, setTopic] = useState('')

  const { yearFilter, topicFilter, expanded } = state

  useEffect(() => {
    const yearFilter = issues
      .map((issue) => {
        const d = new Date(issue.filterDate)
        const year = d.getFullYear()

        return {
          value: year,
          label: year,
        }
      })
      .reduce((unique, o) => {
        if (!unique.some((obj) => obj.value === o.value)) {
          unique.push(o)
        }
        return unique
      }, [])

    const topicFilter = issues
      .map((issue) => issue.filterTopic)
      .flat()
      .reduce((unique, o) => {
        if (!unique.some((obj) => obj.value === o.value)) {
          unique.push(o)
        }
        return unique
      }, [])

    topicFilter.unshift('All')

    setState({ ...state, yearFilter: yearFilter, topicFilter: topicFilter })
  }, [])

  useEffect(() => {
    if (yearFilter.length > 0) {
      setYear(yearFilter[0].value)
    }
    if (topicFilter.length > 0) {
      setTopic(topicFilter[0])
    }
  }, [yearFilter, topicFilter])

  const handleChange = (panel) => (event, isExpanded) => {
    setState({ ...state, expanded: isExpanded ? panel : false })
  }

  const _renderItems = (items) => {
    const classes = useStyles()

    return items
      .filter((item) => {
        if (year !== '') {
          const d = new Date(item.filterDate)
          if (year !== d.getFullYear()) return false
        }

        return true
      })
      .filter((item) => {
        if (topic !== 'All') {
          if (item.filterTopic != topic) return false
        }

        return true
      })
      .map((item, key) => {
        return (
          <Grid item xs={12} key={key}>
            <Accordion
              className={classes.accordion}
              onChange={handleChange(`panel${key}`)}
              expanded={expanded == `panel${key}`}
            >
              <AccordionSummary
                expandIcon={
                  expanded == `panel${key}` ? (
                    <Box>
                      <Button
                        endIcon={<ArrowDropUpIcon />}
                        style={{ marginRight: 10 }}
                      >
                        <Typography className={classes.more}>Less</Typography>
                      </Button>
                      <CtaButton
                        variant='contained'
                        color='primary'
                        width='114'
                        height='42'
                        label='Submit'
                        href='/'
                      />
                    </Box>
                  ) : (
                    <Box>
                      <Button
                        endIcon={<ArrowDropDownIcon />}
                        style={{ marginRight: 10 }}
                      >
                        <Typography className={classes.more}>More</Typography>
                      </Button>
                      <CtaButton
                        variant='contained'
                        color='primary'
                        width='114'
                        height='42'
                        label='Submit'
                        href='/'
                      />
                    </Box>
                  )
                }
                aria-controls={`panel${key}-content`}
                id={`panel${key}-header`}
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
                  <Box>
                    <Typography variant='h5'>{item.title}</Typography>
                    <Typography variant='body1' className={classes.deadline}>
                      Deadline: {item.deadline}
                    </Typography>
                  </Box>
                  <Box></Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box>
                  {/* <ReactMarkdown>{item.details}</ReactMarkdown> */}
                  {documentToReactComponents(item.details, options)}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Grid>
        )
      })
  }

  return (
    <Box>
      <Box mb={5} display='flex' alignItems='center'>
        <Box mr={1}>
          <Typography variant='h5'>Filters:</Typography>
        </Box>
        <Box mr={1}>
          <FilterDropdown
            items={yearFilter}
            defaultValue={year}
            action={(filterVal) => setYear(filterVal)}
          />
        </Box>
        <Box mr={1}>
          <FilterDropdown
            items={topicFilter}
            defaultValue={topic}
            action={(filterVal) => setTopic(filterVal)}
          />
        </Box>
      </Box>
      <Grid container spacing={4}>
        {_renderItems(issues)}
      </Grid>
    </Box>
  )
}
