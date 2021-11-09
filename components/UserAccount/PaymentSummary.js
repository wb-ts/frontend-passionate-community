import React, { useEffect, useState } from 'react'
import { Box, Container, Button } from '@mui/material'
import { makeStyles, styled } from '@mui/styles'
import CardType2 from '../molecules/Cards/CardType2'
import useUserAccount from '/lib/hooks/useUserAccount'
import AddCircle from '@mui/icons-material/AddCircle'

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    marginTop: '0',
    float: 'left',
  },
  paymentInfo: {
    padding: '1vw 2vw 2vw',
    display: 'flex',
    justifyContent: 'space-between',
  },
  addNew: {
    '& a': {
      float: 'right',
      zIndex: '999',
    },
  },
}))

export default function PaymentSummary() {
  const classes = useStyles()
  const { userAccountUser } = useUserAccount()
  const [rows, setRows] = useState([])

  useEffect(async () => {
    try {
      //get customer id
      const res = await fetch(
        '/api/stripe/customer/get-customer?email=test1@m.com' //+ userAccountUser.email //'test1@m.com'
      )
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      const customerId = json.data[0].id

      //get customer payment data
      try {
        const res = await fetch(
          '/api/stripe/paymentMethod/get-payment-methods?customerId=' +
            customerId
        )

        const items = await res.json()
        if (!res.ok) throw Error(json.message)

        setRows(items.data)
      } catch (err) {
        throw Error(err.message)
      }
    } catch (err) {
      throw Error(err.message)
    }
  }, [])

  return (
    <Container>
      <Box>
        <h1 className={classes.title}>Payment Methods</h1>
      </Box>
      <Box className={classes.addNew}>
        <Button
          variant='contained'
          color='primary'
          label='Primary Button'
          href='/'
          startIcon={<AddCircle />}
        >
          Add New
        </Button>
      </Box>
      <Box>
        {rows.map((card, key) => {
          return <CardType2 card={card} key={key} />
        })}
      </Box>
    </Container>
  )
}
