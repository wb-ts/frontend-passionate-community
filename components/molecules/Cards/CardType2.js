import React, { useState } from 'react'
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
} from '@mui/material'
import { makeStyles, styled } from '@mui/styles'
import Grid from '@mui/material/Grid'
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExpandLess from '@mui/icons-material/ExpandLess'
import TextStyle from '@/components/atoms/TextStyle'

const useStyles = makeStyles((theme) => ({
  cardAccordion: {
    marginBottom: '2vw',
  },
  delete: {
    fontWeight: 'bold !important',
  },
  visaDetails: {
    marginBottom: '2vw',
  },
  title: {
    background: '#005E47',
    color: '#ffffff',
    fontWeight: '500',
    padding: '10px 0 10px 2vw',
    fontSize: '17px',
  },
  paymentInfo: {
    padding: '1vw 2vw 2vw',
    display: 'flex',
    justifyContent: 'space-between',
  },
  expire: {
    marginTop: '3vw',
  },
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
        //display: 'flex',
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

  '@global': {
    '.MuiAccordionSummary-content .MuiTypography-h5': {
      fontWeight: 'normal',
    },
    '.MuiAccordion-root': {
      backgroundColor: 'transparent !important',
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
      display: 'block',
      [theme.breakpoints.up('sm')]: {
        padding: '18px 32px 24px',
      },
    },
  },
}))

export default function CardType2(card) {
  const classes = useStyles()
  const myCard = card?.card?.card
  const [expanded, setExpanded] = useState(null)

  console.log(card)
  const list = [
    {
      key: 1,
      title: (
        <>
          <span style={{ textTransform: 'capitalize' }}>{myCard.brand}</span>{' '}
          ending in {myCard.last4}
        </>
      ),
      subtitle: '',
      description: (
        <>
          <Box className={classes.cardAccordion}>
            <Box
              className={classes.visaDetails}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Box>
                <TextStyle variant='h5'>Cardholder</TextStyle>
                <TextStyle variant='body2'>
                  {card?.card?.billing_details?.name}
                </TextStyle>
              </Box>
              <Box>
                <a
                  className={classes.delete}
                  onClick={() => deletePayment(card?.card?.id)}
                >
                  Delete
                </a>
              </Box>
            </Box>
            <Box className={classes.visaDetails}>
              <TextStyle variant='h5'>Expires</TextStyle>
              <TextStyle variant='body2'>
                {myCard.exp_month}/{myCard.exp_year}
              </TextStyle>
            </Box>
            <Box>
              <TextStyle variant='h5'>Billing Address</TextStyle>
              <TextStyle variant='body2'>
                1234 Billing street, <br />
                Billing City, BS
                <br />
                United States
                <br />
                13456
              </TextStyle>
            </Box>
          </Box>
        </>
      ),
    },
  ]
  const deletePayment = async (paymentId) => {
    try {
      const res = await fetch(
        `/api/stripe/paymentMethod/delete-payment-method`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentId: paymentId,
          }),
        }
      )
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
    } catch (e) {
      throw Error(e.message)
    }
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.cardAccordion}>
      {list.map((item) => (
        <Grid item xs={12} key={item.key}>
          <Accordion
            className={classes.accordion}
            onChange={handleChange(`panel${item.key}`)}
            expanded={expanded == `panel${item.key}`}
          >
            <AccordionSummary
              style={{ width: '100%' }}
              expandIcon={
                <Box mr={4}>
                  {expanded == `panel${item.key}` ? (
                    <Button
                      endIcon={<ExpandLess />}
                      style={{ marginRight: 10 }}
                    >
                      <Typography className={classes.more}>Less</Typography>
                    </Button>
                  ) : (
                    <Button
                      endIcon={<ExpandMore />}
                      style={{ marginRight: 10 }}
                    >
                      <Typography className={classes.more}>More</Typography>
                    </Button>
                  )}
                </Box>
              }
              aria-controls={`panel${item.key}-content`}
              id={`panel${item.key}-header`}
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
              <Box>
                <TextStyle variant='h4'>{item.title}</TextStyle>
                <TextStyle variant='subtitle1'>{item.subtitle}</TextStyle>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box>{item.description}</Box>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </Box>
  )
}
