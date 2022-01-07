import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import PinterestIcon from '@mui/icons-material/Pinterest'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  socialButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 0,
    marginTop: 18,
    marginBottom: 18,
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end',
      marginTop: 2,
      marginBottom: 2,
    },
  },
  socialButton: {
    listStyleType: 'none',
    width: 36,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '50%',
    margin: '0 4px',
    [theme.breakpoints.up('sm')]: {
      width: 28,
      height: 28,
      '&:last-of-type': {
        marginRight: 0,
      },
    },
    transition: 'all .2s ease-in-out',
    '&:hover, &:focus': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      transform: 'scale(1.2)',
    },
    '& a': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      '& .MuiSvgIcon-root': {
        height: 18,
        width: 18,
        '& path': {
          color: theme.palette.accent.darkGreen,
        },
      },
    },
  },
}))

const socialButtons = [
  {
    title: 'Facebook',
    href: 'https://www.facebook.com/ascd.org',
    icon: <FacebookIcon />,
    ariaLabel: 'External Link: Visit our Facebook page',
  },
  {
    title: 'Twitter',
    href: 'https://twitter.com/ASCD',
    icon: <TwitterIcon />,
    ariaLabel: 'External Link: Visit our Twitter page',
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/officialascd',
    icon: <InstagramIcon />,
    ariaLabel: 'External Link: Visit our Instagram page',
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/company/ascd',
    icon: <LinkedInIcon />,
    ariaLabel: 'External Link: Visit our LinkedIn page',
  },
  {
    title: 'YouTube',
    href: 'https://www.youtube.com/user/officialascd',
    icon: <YouTubeIcon />,
    ariaLabel: 'External Link: Visit our YouTube page',
  },
  {
    title: 'Pinterest',
    href: 'https://www.pinterest.com/officialascd',
    icon: <PinterestIcon />,
    ariaLabel: 'External Link: Visit our Pinterest page',
  },
]

export default function SocialButtons() {
  const classes = useStyles()

  return (
    <Box>
      <ul className={classes.socialButtons}>
        {socialButtons.map((socialButton) => (
          <li key={socialButton.title} className={classes.socialButton}>
            <a
              href={socialButton.href}
              title={socialButton.title}
              target='_blank'
              rel='noreferrer'
            >
              {socialButton.icon}
            </a>
          </li>
        ))}
      </ul>
    </Box>
  )
}
