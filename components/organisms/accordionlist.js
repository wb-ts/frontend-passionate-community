import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import FilterDropdown from '../atoms/FilterDropdown'
import AccordionFAQ from '../molecules/accordionfaq'
import AccordionIssue from '../molecules/accordionissue'

export default function AccordionList({
  filterType,
  collapseText,
  expandText,
  myItems,
  variant = 'faq',
  issues,
  service,
  slug,
}) {
  const [state, setState] = useState({
    categoryFilter: [],
    yearFilter: [],
    topicFilter: [],
    expanded: false,
  })

  const [category, setCategory] = useState('')
  const [year, setYear] = useState('')
  const [topic, setTopic] = useState('')
  const { categoryFilter, yearFilter, topicFilter, expanded } = state

  useEffect(() => {
    const categoryFilter =
      myItems &&
      myItems
        .map((myItem) => myItem.filterCategory)
        .flat()
        .map((c) => c?.fields?.title)
        .reduce((unique, o) => {
          if (!unique?.some((obj) => obj === o)) {
            unique.push(o)
          }
          return unique
        }, [])
        .sort()

    myItems && categoryFilter.unshift(`All ${filterType}`)

    const yearFilter =
      issues &&
      issues
        .map((issue) => {
          const d = new Date(issue.filterDate)
          const year = d.getFullYear()

          return {
            value: year,
            label: year,
          }
        })
        .reduce((unique, o) => {
          if (!unique?.some((obj) => obj.value === o?.value)) {
            unique.push(o)
          }
          return unique
        }, [])
        .sort((a, b) => a.value - b.value)

    const topicFilter =
      issues &&
      issues
        .map((issue) => issue.filterTopic)
        .flat()
        .reduce((unique, o) => {
          if (o && !unique?.some((obj) => obj.value === o?.value)) {
            unique.push(o)
          }
          return unique
        }, [])

    issues && topicFilter.unshift('All')
    issues &&
      setState({ ...state, yearFilter: yearFilter, topicFilter: topicFilter })

    myItems && setState({ ...state, categoryFilter: categoryFilter })
  }, [])

  useEffect(() => {
    if (categoryFilter.length > 0) {
      if (service) {
        const found = categoryFilter.find(
          (element) => element.toLowerCase() === service.toLowerCase()
        )
        if (found) setCategory(found)
      } else setCategory(categoryFilter[0])
    }
  }, [categoryFilter, service])

  useEffect(() => {
    if (slug) {
      let checkExist = setInterval(function () {
        let el = document.getElementById(slug)
        if (el) {
          navigateTo(el)
          clearInterval(checkExist)
        }
      }, 3000)
    }
  }, [])

  const navigateTo = (el) => {
    const r = el.getBoundingClientRect()
    window.scrollTo({ top: pageYOffset + r.top - 65, behavior: 'smooth' })
  }

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

  const _renderFAQItems = (filterType, collapseText, expandText, items) => {
    return items
      .filter((item) => {
        if (category !== `All ${filterType}`) {
          if (
            !item.filterCategory?.some((obj) => obj.fields.title === category)
          )
            return false
        }
        return true
      })
      .map((item, key) => {
        return (
          <Grid
            item
            xs={12}
            key={key}
            style={{ paddingBottom: 0 }}
            id={item.slug}
          >
            <AccordionFAQ
              expanded={
                slug && item?.slug?.toLowerCase() === slug?.toLowerCase()
                  ? `panel${key}`
                  : false
              }
              id={key}
              collapseText={collapseText}
              expandText={expandText}
              item={item}
            />
          </Grid>
        )
      })
  }

  const _renderIssueItems = (items) => {
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
          <Grid item xs={12} key={key} style={{ paddingBottom: 0 }}>
            <AccordionIssue
              expanded={expanded}
              handleChange={handleChange}
              id={key}
              collapseText={collapseText}
              expandText={expandText}
              item={item}
            />
          </Grid>
        )
      })
  }

  return (
    <Box>
      <Box mb={2.5} display='flex' alignItems='center'>
        <Box mr={1}>
          <Typography variant='h5'>Filters:</Typography>
        </Box>
        {variant === 'faq' && (
          <Box mr={1}>
            <FilterDropdown
              items={categoryFilter}
              defaultValue={category}
              action={(filterVal) => setCategory(filterVal)}
            />
          </Box>
        )}
        {variant === 'issue' && (
          <>
            <Box mr={1}>
              <FilterDropdown
                items={yearFilter}
                defaultValue={year}
                action={(filterVal) => setYear(filterVal)}
                width='90px'
                height='56px'
              />
            </Box>
            <Box mr={1}>
              <FilterDropdown
                items={topicFilter}
                defaultValue={topic}
                action={(filterVal) => setTopic(filterVal)}
              />
            </Box>
          </>
        )}
      </Box>
      <Grid container spacing={4}>
        {variant === 'faq' &&
          _renderFAQItems(filterType, collapseText, expandText, myItems)}
        {variant === 'issue' && _renderIssueItems(issues)}
      </Grid>
    </Box>
  )
}
