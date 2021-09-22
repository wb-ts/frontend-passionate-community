import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import Image from 'material-ui-image'
import paths from '@/paths/path'

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
        <Image
          src={imageUrl}
          alt={title}
          imageStyle={{
            width: '210px',
            height: '296px',
          }}
        />
      </Link>
    </Box>
  )
}
