import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send'
import { Box, Container, TextField, Grid, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ReactMarkdown from 'react-markdown'
import TextStyle from '../../components/atoms/TextStyle'
import { validateEmail } from '../../lib/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '300px',
    backgroundColor: '#BBE3DA',
    display: 'flex',
    direction: 'row',
    marginBottom: '80px',
    [theme.breakpoints.down('sm')]: {
      height: '100%',
      flexDirection: 'column !important',
    },
  },
  content: {
    height: '100%',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      padding: 0,
    },
  },
  contentBox: {
    marginTop: '94px !important',
    marginLeft: '48px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '40px !important',
    },
  },
  title: {
    width: '402px',
    height: '34px !important',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  description: {
    width: '402px',
    height: '200px !important',
    overflow: 'hidden',
  },
  userinput: {
    width: '100%',
    height: '300px',
    maxHeight: '300px',
    justifyContent: 'left',
    alignItems: 'left',
  },
  userinputBox: {
    marginTop: '112px',
    marginLeft: '98px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '30px !important',
      marginBottom: '40px !important',
      marginLeft: '48px',
    },
  },
  email: {
    width: '326px',
    height: '54px',
    color: theme.palette.grey.medium,
    borderColor: '#6200EE',
    borderRadius: '3.5px',
    borderWidth: '1px',
    backgroundColor: theme.palette.background.light,
  },
  icon: {
    color: '#0C8671',
  },
  label: {
    color: theme.palette.grey.medium,
  },
  button: {
    marginRight: '-20px',
    marginLeft: '-20px',
    backgroundColor: 'transparent !important',
  },
}))

export default function EmailCapture({
  title,
  description,
  context = 'Workshop',
}) {
  const classes = useStyles()
  const [emailSent, setEmailSent] = useState(false)
  const [emailAddress, setEmailAddress] = useState('')
  const promptForEmailAddress = 'Your email address'

  const send = async (emailAddress, context) => {
    if (validateEmail(emailAddress)) {
      setEmailSent(true)
      try {
        const res = await fetch('/api/add-captured-email-address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emailAddress,
            context,
          }),
        })

        const json = await res.json()
        if (res.ok !== true) {
          setEmailSent(false)
          throw Error(json.message)
        }
      } catch (e) {
        setEmailSent(false)
        console.log('Function send: ' + e.message)
      }
    }
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={6} className={classes.content}>
        <Box className={classes.contentBox}>
          <TextStyle variant='h3' className={classes.title}>
            {title}
          </TextStyle>
          <Box className={classes.description}>
            <TextStyle variant='subtitle2'>
              <ReactMarkdown>{description}</ReactMarkdown>
            </TextStyle>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.userinput}>
        <Box className={classes.userinputBox}>
          <TextField
            variant='outlined'
            label={promptForEmailAddress}
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            InputProps={{
              endAdornment: (
                <Button
                  disabled={emailAddress === '' || emailSent}
                  className={classes.button}
                  endIcon={
                    <SendIcon
                      className={classes.icon}
                      onClick={() => send(emailAddress, context)}
                    />
                  }
                />
              ),
              classes: { root: classes.email },
            }}
            InputLabelProps={{
              classes: { root: classes.label },
            }}
          ></TextField>
        </Box>
      </Grid>
    </Grid>
  )
}
