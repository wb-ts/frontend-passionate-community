import React from 'react'
import { Box, Divider, Grid } from '@mui/material'
import VideoPlayer from '../molecules/videoplayer'
import VideoPlaylistItem from '../molecules/videoplaylistitem'

export default function VideoPlaylist({ video, videos }) {
  const playlistItems = videos
    .filter(
      (item) =>
        item?.fields?.topic?.fields?.title ==
          video?.fields?.topic?.fields?.title && item.sys.id !== video.sys.id
    )
    .slice(0, 4)
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Box mt={3}>
          <VideoPlayer video={video} noTruncate />
        </Box>
        <Box
          mt={1}
          display={['block', 'block', 'none']}
          width='100vw'
          style={{ marginLeft: '-16px' }}
        >
          <Divider />
        </Box>
      </Grid>
      {videos && (
        <Grid container item xs={12} md={4}>
          <Box mt={[2, 3]} width='100%'>
            {playlistItems.map((item, key) => {
              return (
                <Grid item key={key}>
                  <VideoPlaylistItem item={item} number={key} />
                  {key < playlistItems.length - 1 && <Divider />}
                </Grid>
              )
            })}
          </Box>
        </Grid>
      )}
    </Grid>
  )
}
