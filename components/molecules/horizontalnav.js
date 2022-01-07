import React from 'react'
import { Box, Button, Divider } from '@mui/material'
import { makeStyles } from '@mui/styles'
import TextStyle from '../atoms/TextStyle'

const useStyles = makeStyles((theme) => ({
  root: {
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  btn: {
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(8),
  },
  divider: {
    height: '1px',
    margin: '16px 0px',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  verticalDivider: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}))

export default function HorizontalNav({ items }) {
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
              className={classes.btn}
              href={item.url}
              variant='textPrimary'
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
