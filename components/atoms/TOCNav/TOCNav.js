import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import TextStyle from '../TextStyle'

const useStyles = makeStyles((theme) => ({
  navigation: {
    maxWidth: (props) => props.maxWidth,
    backgroundColor: (props) => props.backgroundColor,
    borderLeft: (props) => (props.borderLeft ? '1px solid #C4C4C4' : ''),

    '& *': {
      fontWeight: 600,
      fontSize: (props) =>
        props.fontSize
          ? theme.typography.pxToRem(props.fontSize)
          : theme.typography.pxToRem(14),
      lineHeight: '18px',
      fontWeight: 400,
      letterSpacing: 0.02,
    },
    '& ul': {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      '& li': {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        paddingLeft: 20,
        color: theme.palette.grey.medium,
        '& *': {
          textAlign: 'left',
        },
      },
    },
  },
  active: {
    color: theme.palette.common.black,
    borderLeftWidth: (props) =>
      props.activeBorderWidth ? props.activeBorderWidth : '0',
    borderLeftColor: (props) =>
      props.activeBorderColor
        ? props.activeBorderColor
        : theme.palette.primary.main,
    borderLeftStyle: 'solid',
    paddingLeft: (props) =>
      props.activeBorderWidth
        ? `calc(20px - ${props.activeBorderWidth}) !important`
        : '0',
  },
}))

export default function TOCNav({ toc_items, ...props }) {
  const [active, setActive] = useState()

  useEffect(() => {
    window.addEventListener('scroll', (e) => debounce(handleScroll(e), 1000))
    return function cleanupListener() {
      window.removeEventListener('scroll', (e) => handleScroll(e))
    }
  }, [])

  const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        timeout = null
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  const handleScroll = (e) => {
    let itemInView = false
    toc_items.map((toc) => {
      const el = document.getElementById(toc.id)
      if (el) {
        if (isElementVisible(el)) {
          if (!itemInView) {
            itemInView = true
            setActive(toc.id)
          }
        }
      }
    })

    function isElementVisible(el) {
      var rect = el.getBoundingClientRect(),
        vWidth = window.innerWidth || document.documentElement.clientWidth,
        vHeight = window.innerHeight || document.documentElement.clientHeight,
        efp = function (x, y) {
          return document.elementFromPoint(x, y)
        }

      // Return false if it's not in the viewport
      if (
        rect.right < 0 ||
        rect.bottom < 0 ||
        rect.left > vWidth ||
        rect.top > vHeight
      )
        return false

      // Return true if any of its top corners are visible
      return (
        el.contains(efp(rect.left, rect.top)) ||
        el.contains(efp(rect.right, rect.top))
      )
    }
  }

  const navigateTo = (id) => {
    const el = window.document.getElementById(id)
    if (el) {
      const r = el.getBoundingClientRect()
      window.scrollTo({
        top: scrollY + r.top - 150,
        behavior: 'smooth',
      })
    }
  }

  const _renderMenuItems = (menuItems, classes) => {
    if (!menuItems) return <></>

    return menuItems.map(({ label, id }) => (
      <li key={label} className={active == id ? classes.active : ''}>
        <Button onClick={() => navigateTo(id)} variant='text'>
          <TextStyle variant='subtitle3'>{label}</TextStyle>
        </Button>
      </li>
    ))
  }

  const classes = useStyles(props)

  return (
    <Box
      aria-label='Article Table of Contents'
      className={classes.navigation}
      ml={0}
      pl={0}
    >
      <ul>{_renderMenuItems(toc_items, classes)}</ul>
    </Box>
  )
}

TOCNav.propTypes = {
  toc_items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  activeBorderWidth: PropTypes.number,
  activeBorderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderLeft: PropTypes.bool,
  fontSize: PropTypes.number,
  maxWidth: PropTypes.number,
}
