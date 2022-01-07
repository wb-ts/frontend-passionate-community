import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Button, Popover, Box, Typography, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  navMenuItem: {
    minWidth: 'initial',
    [theme.breakpoints.up('sm')]: {
      minWidth: '275px',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: 'initial',
    },
    [theme.breakpoints.down('md')]: {
      borderBottom: '1px solid rgba(33, 33, 33, 0.08)',
    },
  },
  button: {
    width: '100%',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.hover.main,
      textDecoration: 'underline',
      '& .MuiButton-endIcon': {
        color: theme.palette.hover.main,
      },
    },
    '&:focus': {
      backgroundColor: theme.palette.grey.extraLight,
      color: theme.palette.hover.main,
      textDecoration: 'underline',
      '& .MuiButton-endIcon': {
        color: theme.palette.hover.main,
      },
    },
    '&:focus-visible': {
      backgroundColor: theme.palette.grey.extraLight,
      color: theme.palette.hover.main,
      textDecoration: 'underline',
    },
    '&:focus:not(:focus-visible)': {
      backgroundColor: 'transparent',
      color: 'initial',
      textDecoration: 'none',
    },
    '&.buttonExpanded': {
      '& .MuiButton-endIcon': {
        transform: 'rotate(180deg)',
      },
    },
    '& span.MuiButton-endIcon': {
      transform: 'rotate(360deg)',
      transition: '0.2s',
      marginLeft: 0,
    },
    [theme.breakpoints.down('md')]: {
      padding: '6px 12px 20px',
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: '28px',
      '& .MuiButton-endIcon': {
        display: 'none',
      },
    },
    [theme.breakpoints.up('md')]: {
      padding: '6px 12px',
      '& .MuiButton-startIcon': {
        display: 'none',
      },
    },
    '& .MuiButton-startIcon': {
      color: theme.palette.primary.light,
      marginLeft: 0,
      marginRight: 18,
      '& .MuiSvgIcon-root': {
        width: 20,
        height: 20,
      },
    },
    '& .MuiButton-endIcon': {
      color: theme.palette.primary.main,
    },
    '& .MuiButton-label': {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    '&:hover ': {
      '& $forwardArrowNoDesktop': {
        color: theme.palette.hover.main,
      },
    },
  },
  forwardArrowNoDesktop: {
    marginLeft: 'auto',
    color: theme.palette.grey.light,
    transform: 'rotate(180deg)',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  forwardArrowNoMobile: {
    marginLeft: 'auto',
    color: theme.palette.grey.light,
    transform: 'rotate(180deg)',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  popover: {
    '& .MuiPaper-rounded': {
      borderRadius: '16px',
      boxShadow:
        '0px 12px 17px rgba(0, 0, 0, 0.03), 0px 5px 22px rgba(0, 0, 0, 0.04), 0px 7px 8px rgba(0, 0, 0, 0.08)',
      [theme.breakpoints.down('sm')]: {
        borderRadius: 0,
        maxHeight: '100%',
        height: '100%',
        maxWidth: '100%',
        width: '100%',
        position: 'fixed',
        top: '0!important',
        left: '0!important',
        right: '0!important',
      },
    },
  },
  megaNav: {
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: theme.palette.grey.extraLight,
    minWidth: 300,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 0,
      backgroundColor: theme.palette.background.light,
    },
  },
  megaNavContent: {
    backgroundColor: theme.palette.background.light,
    width: '100%',
    borderRadius: '16px',
    boxShadow:
      '0px 4px 5px rgba(0, 0, 0, 0.03), 0px 1px 10px rgba(0, 0, 0, 0.04), 0px 2px 4px rgba(0, 0, 0, 0.08)',
    [theme.breakpoints.down('sm')]: {
      borderRadius: 0,
      boxShadow: 'none',
      minWidth: '120px',
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: '340px',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '400px',
    },
    '& ul': {
      listStyleType: 'none',
      paddingLeft: 0,
      marginBlockStart: 0,
      marginBlockEnd: 0,
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        marginTop: '32px',
        marginBottom: 0,
      },
      [theme.breakpoints.up('sm')]: {
        marginBottom: '24px',
      },
      '& li': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '18px 20px',
        padding: '4px 0',
        '& a': {
          width: '100%',
          textDecoration: 'none',
          fontSize: '16px',
          fontWeight: 700,
          color: theme.palette.text.primary,
          [theme.breakpoints.down('md')]: {
            fontSize: '14px',
            fontWeight: 700,
          },
          [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
            fontWeight: 700,
          },
        },
        [theme.breakpoints.up('sm')]: {
          border: '1px solid transparent',
          margin: '0 20px',
          padding: '18px 12px',
          borderTop: '1px solid rgba(33, 33, 33, 0.08)',
          '&:first-child': {
            borderTop: '1px solid transparent',
          },
        },
        '&:hover': {
          [theme.breakpoints.up('sm')]: {
            borderRadius: 4,
            borderTop: '1px solid transparent',
            boxShadow:
              '0px 6px 10px rgba(0, 0, 0, 0.03), 0px 1px 18px rgba(0, 0, 0, 0.04), 0px 3px 5px rgba(0, 0, 0, 0.08)',
          },
          '& a': {
            color: theme.palette.hover.main,
            textDecoration: 'underline',
          },
          '& $forwardArrowNoMobile': {
            color: theme.palette.hover.main,
          },
        },
      },
    },
  },
  megaNavContentHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: theme.palette.background.light,
    borderRadius: '0 16px 0 32px',
    padding: '20px',
    [theme.breakpoints.down('sm')]: {
      borderRadius: '0 0 0 32px',
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.primary.main,
    },
  },
  megaNavContentHeaderClose: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.text.secondary,
    },
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    marginLeft: theme.spacing(1),
  },
  megaNavContentRightLinks: {
    position: 'relative',
    backgroundColor: theme.palette.grey.extraLight,
    marginTop: '32px',
    marginLeft: '6px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      minWidth: '200px',
      marginLeft: 0,
      backgroundColor: theme.palette.background.light,
      borderRadius: '0 0 16px 16px',
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: '220px',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '240px',
    },
    '& ul': {
      listStyleType: 'none',
      paddingLeft: 0,
      marginBlockStart: 0,
      marginBlockEnd: 0,
      width: '100%',
      paddingTop: '24px',
      [theme.breakpoints.down('sm')]: {
        marginTop: '32px',
        paddingTop: 0,
      },
      '& li': {
        padding: '6px 24px',
        '& a': {
          textDecoration: 'none',
          fontSize: '14px',
          lineHeight: '22px',
          fontWeight: 400,
          color: theme.palette.text.primary,
          [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
            lineHeight: '26px',
          },
        },
        '&:hover': {
          '& a': {
            color: theme.palette.hover.main,
            textDecoration: 'underline',
          },
        },
      },
      '&:before': {
        position: 'absolute',
        top: 0,
        left: '24px',
        content: '""',
        height: '8px',
        width: '32px',
        background: theme.palette.primary.light,
      },
    },
  },
  // itemBox: {
  //   padding: theme.spacing(2),
  //   minWidth: 256,
  //   minHeight: 146,
  //   backgroundColor: theme.palette.primary.main,
  // },
  itemLabel: {
    //color: theme.palette.common.white,
  },
  divider: {
    color: 'black',
    margin: `${theme.spacing(1)} ${theme.spacing(4)}`,
  },
  searchCategoryHeader: {
    fontWeight: 800,
    lineHeight: theme.typography.pxToRem(22),
    letterSpacing: '0.2px',
    marginRight: theme.spacing(1),
  },
  searchBySection: {
    width: '300px',
  },
}))

export default function NavMenuItem({
  id,
  label,
  labelIcon,
  startIcon,
  endIcon,
  items,
  rightLinks,
  href,
}) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenuClick = (event) => {
    setAnchorEl(event.target)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const classes = useStyles()
  return (
    <>
      <li key={label} className={classes.navMenuItem}>
        <Button
          id={id}
          variant='standard'
          startIcon={startIcon}
          endIcon={endIcon}
          disableElevation
          disableFocusRipple
          disableRipple
          className={
            anchorEl ? `${classes.button} buttonExpanded` : classes.button
          }
          onClick={(e) => (href ? router.push(href) : handleMenuClick(e, id))}
        >
          {label}
          <KeyboardBackspaceIcon className={classes.forwardArrowNoDesktop} />
        </Button>
      </li>
      <Popover
        id='mega-nav'
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        className={classes.popover}
        elevation={0}
      >
        <Box className={classes.megaNav}>
          <Box className={classes.megaNavContent}>
            <Box className={classes.megaNavContentHeader}>
              <IconButton
                className={classes.megaNavContentHeaderClose}
                onClick={handleMenuClose}
                size='large'
              >
                <KeyboardBackspaceIcon />
              </IconButton>
              {labelIcon}
              <Typography variant='h4' className={classes.title}>
                {label}
              </Typography>
            </Box>
            <ul>
              {items.map((item, key) => (
                <li key={`${item.label}-${key}`}>
                  <Link href={item.href}>
                    <a target={item.target}>{item.label}</a>
                  </Link>
                  <KeyboardBackspaceIcon
                    className={classes.forwardArrowNoMobile}
                  />
                </li>
              ))}
            </ul>
          </Box>
          {rightLinks && (
            <Box className={classes.megaNavContentRightLinks}>
              <ul>
                {rightLinks.map((item, key) => (
                  <li key={`${item.label}-${key}`}>
                    <Link href={item.href}>
                      <a target={item.target}>{item.label}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      </Popover>
    </>
  )
}
