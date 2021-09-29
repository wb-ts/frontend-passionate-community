import React, { useEffect, useState, useContext } from 'react'
import { Box, Container, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '@/components/layout'
import SEOHead from '@/const/head'
import { useRouter } from 'next/router'
import { Skeleton } from '@material-ui/lab'

export default function VirtualWorkshops() {
  const router = useRouter()
  if (router.isFallback) {
    return (
      <Skeleton animation='wave' variant='rect' width='100%' height='100px' />
    )
  }

  return (
    <Layout>
      <SEOHead />

      <Container maxWidth='lg'>
        <Box pt={[8, 10, 9]} mb={10}>
          Index Page
        </Box>
      </Container>
    </Layout>
  )
}
