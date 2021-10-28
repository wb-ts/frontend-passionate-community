import React from 'react'
import { Box, Button, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TextStyle from '@/components/atoms/TextStyle'
import { PropTypes } from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },

  divider: {
    height: '1px',
    margin: '16px 0px',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  verticalDivider: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

export default function HorizontalNav({ items, mainBtn, selectedBtn }) {
  const classes = useStyles()

  return (
    <Box
      className={classes.root}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      {items.map((item, key) => {
        const renderDivider = () => {
          if (key < items.length - 1) {
            return (
              <Divider
                orientation='vertical'
                className={classes.verticalDivider}
                flexItem
              />
            )
          }
        }
        const _horizontalDivider = () => {
          if (key < items.length - 1) {
            return (
              <Divider
                orientation='horizontal'
                variant='fullWidth'
                flexItem
                className={classes.divider}
              />
            )
          }
        }
        return (
          <>
            <Button
              key={`horizontal-nav-${key}`}
              className={item.selected ? `${selectedBtn}` : `${mainBtn}`}
              href={item.url}
              variant='textPrimary'
              data-testid={`horizontalNav-${key}`}
            >
              <TextStyle variant='subtitle2'>{item.label}</TextStyle>
            </Button>
            {renderDivider()}
            {_horizontalDivider()}
          </>
        )
      })}
    </Box>
  )
}

HorizontalNav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
      selected: PropTypes.bool,
    })
  ),
  mainBtn: PropTypes.string,
  selectedBtn: PropTypes.string,
}
