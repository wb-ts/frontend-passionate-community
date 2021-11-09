import React, { useState, useEffect } from 'react'
import { Card, Box, TextField, Button, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import TextStyle from '@/components/atoms/TextStyle'
import CtaButton from '@/components/atoms/CtaButton'
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import useUserAccount from '../../lib/hooks/useUserAccount'
import StripeInput from '@/components/Stripe/StripeInput'
import { useRouter } from 'next/router'
import PaymentSummary from './PaymentSummary'

const useStyles = makeStyles((theme) => ({
  root: {},
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '310px',
  },
  helperText: {
    color: theme.palette.primary.main,
  },
  labelText: {
    color: theme.palette.primary.main,
  },
  mainBox: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  title: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
    },
  },
  secondBox: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginLeft: 1,
      marginRight: 1,
      justifyContent: 'center',
      alignSelf: 'center',
    },
  },
  buttons: {
    [theme.breakpoints.down('sm')]: {
      width: '95%',
      justifyContent: 'center',
      alignSelf: 'center',
    },
  },
}))

export default function PaymentMethod({ paymentMethodId }) {
  const classes = useStyles()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  const { userAccountUser } = useUserAccount()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }
    setLoading(true)

    try {
      //get customer id
      const res = await fetch(
        '/api/stripe/customer/get-customer?email=' + userAccountUser.email //'test1@m.com'
      )
      const json = await res.json()
      if (!res.ok) throw Error(json.message)

      //create payment method and attach to the customer
      paymentMethodCreate(json.data[0].id)
    } catch (err) {
      throw Error(err.message)
    } finally {
      setLoading(false)
    }
  }

  const paymentMethodCreate = async (customerId) => {
    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
    })
    if (result.error) {
      throw Error(result.error)
    } else {
      PMattachCustomer(customerId, result.paymentMethod.id)
    }
  }

  const PMattachCustomer = async (customerId, paymentMethodId) => {
    try {
      const resp = await fetch('/api/stripe/customer/attach-payment-method', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: customerId,
          paymentMethodId: paymentMethodId,
        }),
      })
      const jsonp = await resp.json()
      if (!resp.ok) throw Error(jsonp.message)
      //direct the user to the list of payment methods page, refreshing the page for now.
      elements.getElement(CardNumberElement).clear()
      elements.getElement(CardExpiryElement).clear()
      elements.getElement(CardCvcElement).clear()
      router.reload(window.location.pathname)
    } catch (err) {
      throw Error(err.message)
    }
  }
  return (
    <Card style={{ borderRadius: '0px 0px 0px 32px' }}>
      <Box display='flex' flexDirection='row' className={classes.mainBox}>
        <Box
          p={5}
          display='flex'
          flexDirection='column'
          bgcolor='#005E47'
          width='34%'
          className={classes.title}
        >
          <TextStyle variant='h3' color='white'>
            {paymentMethodId ? 'Edit payment method' : 'Add a new payment'}
          </TextStyle>
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          ml={2}
          mr={3}
          mt={5}
          pb={3}
          width='66%'
          className={classes.secondBox}
        >
          <Box pb={2}>
            <Box pb={2}>
              <TextField
                label='Credit Card Number'
                name='ccnumber'
                helperText='please enter card number'
                variant='filled'
                FormHelperTextProps={{
                  className: classes.helperText,
                }}
                required
                className={classes.textField}
                InputLabelProps={{
                  className: classes.labelText,
                  shrink: true,
                }}
                InputProps={{
                  inputComponent: StripeInput,
                  inputProps: {
                    component: CardNumberElement,
                  },
                }}
              />
            </Box>
            <Box pb={2}>
              <TextField
                label='Expiration Date'
                name='ccexp'
                helperText='please enter card expiration'
                variant='filled'
                FormHelperTextProps={{
                  className: classes.helperText,
                }}
                required
                className={classes.textField}
                InputLabelProps={{
                  className: classes.labelText,
                  shrink: true,
                }}
                InputProps={{
                  inputComponent: StripeInput,
                  inputProps: {
                    component: CardExpiryElement,
                  },
                }}
              />
            </Box>
            <Box pb={2}>
              <TextField
                label='CVC'
                name='cvc'
                helperText='please enter card CVC'
                variant='filled'
                FormHelperTextProps={{
                  className: classes.helperText,
                }}
                required
                className={classes.textField}
                InputLabelProps={{
                  className: classes.labelText,
                  shrink: true,
                }}
                InputProps={{
                  inputComponent: StripeInput,
                  inputProps: {
                    component: CardCvcElement,
                  },
                }}
              />
            </Box>
          </Box>
          <Box
            pb={2}
            width='45%'
            alignSelf='flex-end'
            className={classes.buttons}
          >
            <CtaButton
              variant='outlined'
              color='primary'
              fullWidth={true}
              size='medium'
              label='Cancel'
              onClick={() => {
                console.log('clicked')
              }}
            />
          </Box>
          <Box
            pb={2}
            width='45%'
            alignSelf='flex-end'
            className={classes.buttons}
          >
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              fullWidth={true}
              onClick={(e) => handleSubmit(e)}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Save'}
            </Button>
          </Box>
        </Box>
      </Box>

      <Box>
        <PaymentSummary />
      </Box>
    </Card>
  )
}
