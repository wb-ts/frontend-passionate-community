import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import paths from '../../paths/path'

const useStyles = makeStyles((theme) => ({
  tile: {
    display: 'block',
    marginRight: '16px',
    backgroundColor: theme.palette.common.white,
    padding: '0px !important',
    width: '210px',
    height: '296px',
  },
}))

export default function ImageTile({ slug, imageUrl, title }) {
  const classes = useStyles()
  return (
    <Box className={classes.tile}>
      <Link color='textPrimary' href={paths.el({ slug: slug })}>
        <a>
          <Image
            src={imageUrl}
            alt={title}
            width={210}
            height={296}
            placeholder='blur'
            blurDataURL='/images/blurrImg.png'
          />
        </a>
      </Link>
    </Box>
  )
}
