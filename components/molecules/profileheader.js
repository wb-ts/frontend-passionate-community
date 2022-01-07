import React from 'react'
import Link from 'next/link'
import InstagramIcon from '@mui/icons-material/Instagram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { Box, Grid, Avatar } from '@mui/material'
import { makeStyles } from '@mui/styles'
// import LinkedInIcon from '@mui/icons-material/LinkedIn'
// import TwitterIcon from '@mui/icons-material/Twitter'
// import FacebookIcon from '@mui/icons-material/Facebook'
// import EmailIcon from '@mui/icons-material/Email'
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  // YouTubeIcon,
  // InstagramIcon,
} from 'react-share'
import { imageoptimization } from '../../const'
import TextStyle from '../atoms/TextStyle'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.grey.extraLight,
    borderBottomLeftRadius: 64,
    minHeight: 600,

    '&::after': {
      content: '" "',
      borderBottom: '600px solid rgba(255, 255, 255, 0.4)',
      borderRight: '100vw solid transparent',
      width: 0,
      position: 'absolute',
    },
    [theme.breakpoints.up('md')]: {
      minHeight: 398,
      height: 398,
      borderBottomLeftRadius: 180,
      paddingBottom: 0,
      '&::after': {
        borderBottom: '398px solid rgba(255, 255, 255, 0.4);',
      },
    },
  },
  author: {
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
  },
  avatar: {
    width: '240px',
    height: '240px',
    border: '6px solid white',
    boxShadow: theme.shadows[16],
  },
  metadata: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  metadataTop: {
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      alignItems: 'flex-start',
    },
  },
  social: {
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  '@global': {
    '.MuiSvgIcon-colorPrimary': {
      color: '#ffffff',
      background: '#3C64B1',
      padding: '5px',
      borderRadius: '20px',
    },
  },
}))
export default function ProfileHeader({ profile }) {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Box maxWidth={850} width='100%' zIndex={1}>
        <Grid container className={classes.author}>
          <Grid item md={4} xs={12}>
            <Avatar
              style={{ margin: '0 auto' }}
              alt={profile.fields.thumbnail?.title}
              src={
                profile.fields?.thumbnail?.fields?.imageBynder
                  ? profile.fields?.thumbnail?.fields?.imageBynder[0]?.src +
                    '?' +
                    imageoptimization.qualityParameter +
                    '=' +
                    imageoptimization.qualityValue
                  : profile.fields?.thumbnail?.fields?.imageContentful?.fields
                      ?.file?.url +
                    '?' +
                    imageoptimization.qualityParameter +
                    '=' +
                    imageoptimization.qualityValue
              }
              className={classes.avatar}
            />
          </Grid>
          <Grid item md={8} xs={12} className={classes.metadata}>
            <Box
              display='flex'
              flexDirection='column'
              className={classes.metadataTop}
              mt={[5, 5, 0]}
            >
              <TextStyle variant='h2'>
                {profile.fields.firstName} {profile.fields.lastName}
              </TextStyle>
              <Box mt={1}>
                <TextStyle
                  variant='body2'
                  color='rgba(84, 99, 102, 1)
'
                >
                  {profile.fields.role}
                  {profile.fields.role &&
                    profile.fields.experience &&
                    `, ${profile.fields.experience}`}

                  {(profile.fields.role || profile.fields.experience) &&
                    profile.fields.position &&
                    `, ${profile.fields.position}`}
                </TextStyle>
              </Box>
            </Box>

            <Box mt={3} ml={[3, 0]} display='flex' className={classes.social}>
              {profile.fields.email && (
                <Link href={`mailto:${profile.fields.email}`} target='_New'>
                  <a>
                    <Box
                      mt={[1, 1, 0]}
                      mr={[0, 3]}
                      display='flex'
                      alignItems='center'
                    >
                      <EmailIcon size={38} borderRadius={10} />
                      <Box ml={1}>
                        <TextStyle variant='buttonLarge'>Email</TextStyle>
                      </Box>
                    </Box>
                  </a>
                </Link>
              )}
              {profile.fields.linkedIn && (
                <Link href={profile.fields.linkedIn} target='_New'>
                  <a>
                    <Box
                      mt={[1, 1, 0]}
                      mr={[0, 3]}
                      display='flex'
                      alignItems='center'
                    >
                      <LinkedinIcon size={38} borderRadius={10} />
                      <Box ml={1}>
                        <TextStyle variant='buttonLarge'>LinkedIn</TextStyle>
                      </Box>
                    </Box>
                  </a>
                </Link>
              )}
              {profile.fields.twitter && (
                <Link href={profile.fields.twitter} target='_New'>
                  <a>
                    <Box
                      mt={[1, 1, 0]}
                      mr={[0, 3]}
                      display='flex'
                      alignItems='center'
                    >
                      <TwitterIcon size={38} borderRadius={10} />
                      <Box ml={1}>
                        <TextStyle variant='buttonLarge'>Twitter</TextStyle>
                      </Box>
                    </Box>
                  </a>
                </Link>
              )}
              {profile.fields.facebook && (
                <Link href={profile.fields.facebook} target='_New'>
                  <a>
                    <Box
                      mt={[1, 1, 0]}
                      mr={[0, 3]}
                      display='flex'
                      alignItems='center'
                    >
                      <FacebookIcon size={38} borderRadius={10} />
                      <Box ml={1}>
                        <TextStyle variant='buttonLarge'>Facebook</TextStyle>
                      </Box>
                    </Box>
                  </a>
                </Link>
              )}
              {profile.fields.youTube && (
                <Link href={profile.fields.youTube} target='_New'>
                  <a>
                    <Box
                      mt={[1, 1, 0]}
                      mr={[0, 3]}
                      display='flex'
                      alignItems='center'
                    >
                      <YouTubeIcon
                        color='primary'
                        style={{ borderRadius: '10px', width: 38, height: 38 }}
                      />
                      <Box ml={1}>
                        <TextStyle variant='buttonLarge'>YouTube</TextStyle>
                      </Box>
                    </Box>
                  </a>
                </Link>
              )}
              {profile.fields.instagram && (
                <Link
                  mt={[1, 1, 0]}
                  href={profile.fields.instagram}
                  target='_New'
                >
                  <a>
                    <Box mr={[0, 3]} display='flex' alignItems='center'>
                      <InstagramIcon
                        color='primary'
                        style={{ borderRadius: '10px', width: 38, height: 38 }}
                      />
                      <Box ml={1}>
                        <TextStyle variant='buttonLarge'>Instagram</TextStyle>
                      </Box>
                    </Box>
                  </a>
                </Link>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
