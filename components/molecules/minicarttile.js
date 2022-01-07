import React from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import paths from '../../paths/path'
import TextStyle from '../atoms/TextStyle'
import { SnipcartButton } from '../Snipcart'

const useStyles = makeStyles((theme) => ({
  tile: {
    position: 'relative',
    width: '100%',
    height: 80,
    boxShadow:
      '0px -12px 17px rgba(0, 0, 0, 0.03), 0px -5px 22px rgba(0, 0, 0, 0.04), 0px -7px 8px rgba(0, 0, 0, 0.08)',
    padding: 10,
  },
  details: {
    width: '68%',
    minHeight: 80,
    padding: 0,
  },
  title: {
    marginTop: theme.spacing(1),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 1 /* number of lines to show */,
    '-webkit-box-orient': 'vertical',
  },
  price: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    fontSize: theme.typography.pxToRem(16),
    fontWeight: 700,
    lineHeight: theme.typography.pxToRem(18),
    letterSpacing: '0.2px',
  },
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  cardActionRoot: {
    '&:hover $focusHighlight': {
      opacity: 0,
    },
  },
  focusHighlight: {},
  button: {
    position: 'absolute',
    right: 10,
    bottom: 20,
  },
  snipcartBtn: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    padding: '8px 16px',
    border: '2px solid #fff',
    borderRadius: '2px',
    height: 40,
    minWidth: '100%',
    padding: '0px 16px',
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '24px',
    letterSpacing: '0.02em',
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.hover.main,
      textDecoration: 'underline',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 117,
    },
  },
}))

export default function MiniCartTile({ snipcart, onclick = null }) {
  const classes = useStyles()
  const router = useRouter()
  return (
    <>
      <Card className={classes.tile} square elevation={0}>
        <CardActionArea
          onClick={() =>
            router.push(
              paths.books({
                slug: snipcart.dataItemUrl,
                variant: snipcart.dataItemId,
              })
            )
          }
          classes={{
            root: classes.cardActionRoot,
            focusHighlight: classes.focusHighlight,
          }}
          disableRipple
        >
          <CardContent className={classes.details}>
            <Box className={classes.title}>
              <TextStyle variant='h6'>{snipcart.dataItemName}</TextStyle>
            </Box>
            <Typography className={classes.price}>
              ${snipcart.dataItemPrice}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Box className={classes.button}>
          <SnipcartButton
            className={classes.snipcartBtn}
            snipcart={snipcart}
            onclick={() => (onclick ? onclick() : void 0)}
          />
        </Box>
      </Card>
    </>
  )
}
