import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useReactiveVar } from '@apollo/client'
import { Box, Typography, FormControl, Select, MenuItem } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { hasMemberBookPriceVar } from '../../../../lib/apollo-client/cache'
import paths from '../../../../paths/path'

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(0),
    marginLeft: theme.spacing(2),
  },
  select: {
    display: 'flex',
    justifyContent: 'center',
    '& *': {
      textTransform: 'uppercase',
    },
    '& svg': {
      color: theme.palette.grey.medium,
    },
  },
}))

const PriceDisplay = ({ id, prices, membershipVar, handleOnChange }) => {
  const classes = useStyles()
  const hasMemberPricing = useReactiveVar(membershipVar)

  const [price, setPrice] = useState(
    prices.find((price) => price.default) || prices[0]
  )

  const handlePriceChange = (e) =>
    setPrice(
      prices.find(
        (price) => price.key === e.target.value || price.name === e.target.value
      )
    )

  useEffect(() => handleOnChange && price && handleOnChange(price.key), [price])

  return (
    <Box>
      <Box display='flex' alignItems='flex-end' mb={1}>
        <Typography variant='h3'>
          ${hasMemberPricing ? price.priceMember : price.priceNonMember}
        </Typography>
        <FormControl className={classes.formControl}>
          <Select
            labelId={`price-label-${id}`}
            id={`price-select-${id}`}
            value={price.key || price.name}
            onChange={handlePriceChange}
            className={classes.select}
            disableUnderline
            autoWidth
          >
            {prices.map((option) => (
              <MenuItem
                key={option.key || option.name}
                value={option.key || option.name}
              >
                <Typography variant='buttonSmall'>{option.name}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {!hasMemberPricing ? (
        <Typography variant='subtitle2'>
          $ {price.priceMember} member price{' '}
          <Link href={paths.subscribe}>
            <a>
              <Typography variant='medium-link' color='#005E47'>
                {'join now'}
              </Typography>
            </a>
          </Link>
        </Typography>
      ) : (
        <Typography variant='subtitle2'>
          ${price.priceNonMember} non-member price
        </Typography>
      )}
    </Box>
  )
}

export default PriceDisplay

PriceDisplay.propTypes = {
  id: PropTypes.string.isRequired,
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      name: PropTypes.string.isRequired,
      priceMember: PropTypes.number.isRequired,
      priceNonMember: PropTypes.number.isRequired,
      default: PropTypes.bool,
    })
  ),
  membershipVar: PropTypes.func,
  handleOnChange: PropTypes.func,
}

PriceDisplay.defaultProps = {
  membershipVar: hasMemberBookPriceVar,
}
