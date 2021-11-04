import React from 'react'
import { Card, CardContent, Box, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import TextStyle from '@/components/atoms/TextStyle'
import PropTypes from 'prop-types'
import Image from 'next/image'
import CustomLink from '@/components/atoms/CustomLink'
import CtaButton from '@/components/atoms/CtaButton'

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  header1: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      width: '80%',
      justifyContent: 'space-between',
    },
  },
  header2: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      width: '80%',
      marginLeft: theme.spacing(2),
      justifyContent: 'space-between',
    },
  },
  header3: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      width: '80%',
      justifyContent: 'space-between',
    },
  },
  body: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  dates: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
  },
  button3: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
    },
  },
}))

export default function CardItem({ cardData }) {
  const classes = useStyles()
  const myLoader = ({ src, width, quality }) => {
    return `/images/ASCDImageFiller.png?w=20px&q={90}`
  }
  return (
    <Card p={5}>
      <Box>
        {cardData.showHeader && (
          <Box
            height='25%'
            bgcolor='#E4E9EC'
            display='flex'
            flexDirection='row'
            p={1}
            justifyContent='space-between'
            className={classes.header}
          >
            {cardData.showHeader1 && (
              <Box
                width='33%'
                display='flex'
                flexDirection='column'
                mx={2}
                className={classes.header1}
              >
                <Box>
                  <TextStyle variant='subtitle2'>
                    {cardData.header1Text}
                  </TextStyle>
                </Box>
                <Box>
                  <TextStyle variant='h6'>{cardData.header1Value}</TextStyle>
                </Box>
              </Box>
            )}
            {cardData.showHeader2 && (
              <Box
                width='33%'
                display='flex'
                flexDirection='column'
                className={classes.header2}
              >
                <Box>
                  <TextStyle variant='subtitle2'>
                    {cardData.header2Text}
                  </TextStyle>
                </Box>
                <Box>
                  <TextStyle variant='h6'>{cardData.header2Value}</TextStyle>
                </Box>
              </Box>
            )}
            {cardData.showHeader3 && (
              <Box
                width='33%'
                display='flex'
                flexDirection='column'
                alignItems='flex-end'
                mx={2}
                className={classes.header3}
              >
                <Box>
                  <TextStyle variant='subtitle2'>
                    {cardData.header3Text}
                  </TextStyle>
                </Box>
                <Box>
                  <TextStyle variant='h6'>{cardData.header3Value}</TextStyle>
                </Box>
              </Box>
            )}
          </Box>
        )}
        <Box
          height='75%'
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
          my={3}
          mx={4}
          className={classes.body}
        >
          {cardData.showImage && (
            <Box>
              <Image
                src={cardData.imageUrl}
                width='250'
                height='250'
                placeholder='empty'
                loader={myLoader}
              />
            </Box>
          )}
          {cardData.showTitle && cardData.showDates && (
            <Box
              ml={4}
              display='flex'
              flexDirection='column'
              justifyContent='space-between'
            >
              {cardData.showTitle && (
                <Box>
                  <CustomLink
                    href={cardData.itemUrl}
                    label={cardData.itemTitle}
                    color='black'
                    size='large'
                  />
                </Box>
              )}
              {cardData.showDates && (
                <Box
                  display='flex'
                  flexDirection='column'
                  className={classes.dates}
                >
                  {cardData.showDate1 && (
                    <Box>
                      <TextStyle variant='subtitle2'>
                        {cardData.itemDate1Text} {cardData.itemDate1Value}
                      </TextStyle>
                    </Box>
                  )}
                  {cardData.showDate2 && (
                    <Box>
                      <TextStyle variant='subtitle2'>
                        {cardData.itemDate2Text} {cardData.itemDate2Value}
                      </TextStyle>
                    </Box>
                  )}
                  {cardData.showDate3 && (
                    <Box>
                      <TextStyle variant='subtitle2'>
                        {cardData.itemDate3Text} {cardData.itemDate3Value}
                      </TextStyle>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          )}
          {cardData.showButtons && (
            <Box
              display='flex'
              flexDirection='column'
              justifyContent='space-between'
              ml={4}
            >
              <Box
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
              >
                {cardData.showButton1 && (
                  <Box mb={3}>
                    <CtaButton
                      variant='contained'
                      color='primary'
                      fullWidth={true}
                      size='medium'
                      label={cardData.button1Text}
                      onClick={() => {
                        console.log('clicked')
                      }}
                    />
                  </Box>
                )}
                {cardData.showButton2 && (
                  <Box>
                    <CtaButton
                      variant='contained'
                      color='primary'
                      fullWidth={true}
                      size='medium'
                      label={cardData.button2Text}
                      onClick={() => {
                        console.log('clicked')
                      }}
                    />
                  </Box>
                )}
              </Box>
              {cardData.showButton3 && (
                <Box
                  display='flex'
                  flexDirection='column'
                  alignItems='flex-end'
                  className={classes.button3}
                >
                  <CtaButton
                    variant='outlined'
                    color='primary'
                    fullWidth={true}
                    size='medium'
                    label={cardData.button3Text}
                    onClick={() => {
                      console.log('clicked')
                    }}
                  />
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  )
}

//please just add props as needed to make this card re usable.
CardItem.propTypes = {
  cardData: PropTypes.shape({
    showHeader: PropTypes.bool,
    header1Text: PropTypes.string,
    header1Value: PropTypes.string,
    showHeader1: PropTypes.bool,
    header2Text: PropTypes.string,
    header2Value: PropTypes.string,
    showHeader2: PropTypes.bool,
    header3Text: PropTypes.string,
    header3Value: PropTypes.string,
    showHeader3: PropTypes.bool,
    showImage: PropTypes.bool,
    imageUrl: PropTypes.string,
    showTitle: PropTypes.bool,
    itemTitle: PropTypes.string,
    itemUrl: PropTypes.string,
    showDates: PropTypes.bool,
    itemDate1Text: PropTypes.string,
    itemDate1Value: PropTypes.string,
    showDate1: PropTypes.bool,
    itemDate2Text: PropTypes.string,
    itemDate2Value: PropTypes.string,
    showDate2: PropTypes.bool,
    itemDate3Text: PropTypes.string,
    itemDate3Value: PropTypes.string,
    showDate3: PropTypes.bool,
    showButtons: PropTypes.bool,
    button1Text: PropTypes.string,
    button1Url: PropTypes.string,
    showButton1: PropTypes.bool,
    button2Text: PropTypes.string,
    button2Url: PropTypes.string,
    showButton2: PropTypes.bool,
    button3Text: PropTypes.string,
    button3Url: PropTypes.string,
    showButton3: PropTypes.bool,
  }),
}
