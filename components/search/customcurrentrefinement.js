import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Chip, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { connectCurrentRefinements } from 'react-instantsearch-dom'
import { CustomClearRefinements } from './customclearrefinements'

const useStyles = makeStyles((theme) => ({
  chipFilter: {
    float: 'left',
    listStylePosition: 'inside',
    margin: 'auto',
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    height: '28px',
    backgroundColor: theme.palette.grey.extraLight,
    color: theme.palette.text.primary,
    '& .MuiChip-deleteIcon': {
      width: '18px',
      height: '18px',
      '& path': {
        fill: theme.palette.text.primary,
      },
      '&:hover, &:focus': {
        backgroundColor: theme.palette.grey.medium,
        borderRadius: '50%',
        '& path': {
          fill: theme.palette.text.secondary,
        },
      },
    },
  },
  list: {
    listStyleType: 'none',
    paddingLeft: '0px',
  },
  clear: {
    paddingTop: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    '&:hover, &:focus': {
      '& a': {
        color: theme.palette.hover.main,
      },
    },
  },
}))

const CurrentRefinements = ({ items, refine, createURL }) => {
  const classes = useStyles()

  return (
    <div className={classes.box}>
      <ul className={classes.list} key={null}>
        {items.map((item) => (
          <>
            {item.items ? (
              <>
                {item.items.map((nested, i) => (
                  <li key={i}>
                    <Chip
                      // label={`${item.label.toUpperCase()} ${nested.label}`}
                      label={`${
                        nested.label != 'pubissue'
                          ? nested.label
                          : 'publication'
                      }`}
                      deleteIcon={<CloseIcon />}
                      onDelete={(event) => {
                        event.preventDefault()
                        refine(nested.value)
                      }}
                      className={classes.chipFilter}
                    />
                  </li>
                ))}
              </>
            ) : (
              <a
                href={createURL(item.value)}
                onClick={(event) => {
                  event.preventDefault()
                  refine(item.value)
                }}
              >
                {item.label}
              </a>
            )}
          </>
        ))}
        <li className={classes.chip}>
          <Box className={classes.clear}>
            <CustomClearRefinements />
          </Box>
        </li>
      </ul>
    </div>
  )
}

export const CustomCurrentRefinements =
  connectCurrentRefinements(CurrentRefinements)
