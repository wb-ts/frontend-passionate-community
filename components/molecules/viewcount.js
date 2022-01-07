import React from 'react'
import { makeStyles } from '@mui/styles'
import Axios from 'axios'
import useSWR from 'swr'
import TextStyle from '../atoms/TextStyle'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

export default function ViewCount({ mediaId, variant }) {
  const classes = useStyles()
  const authAxios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_WISTIA_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_WISTIA_API_ACCESS_TOKEN}`,
    },
  })
  const fetcher = (url) => authAxios.get(url).then((res) => res.data)
  const { data, error } = useSWR(`/stats/medias/${mediaId}.json`, fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error.status === 404) return
      if (retryCount >= 3) return
      setTimeout(() => revalidate({ retryCount }), 5000)
    },
  })
  let displayText = ''
  if (error) {
    displayText = 'ERROR'
    console.error(error)
  } else {
    displayText = data?.play_count + ' views'
  }

  return (
    <TextStyle variant={variant ? variant : 'overline'}>
      {displayText}
    </TextStyle>
  )
}
