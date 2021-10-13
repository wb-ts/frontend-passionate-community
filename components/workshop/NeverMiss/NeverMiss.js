import React from 'react'
import {
  Box,
  Grid,
  InputAdornment,
  makeStyles,
  OutlinedInput,
  Typography,
} from '@material-ui/core'
import { Send as SendIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.lightGreen,
    padding: '77px 40px',
    margin: '80px 0',
  },
  title: {
    fontWeight: 800,
    fontSize: 24,
    marginBottom: '16px',
  },
  description: {
    maxWidth: '402px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 'unset',
    },
  },
  email: {
    background: 'white',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}))
export default function NeverMiss() {
  const classes = useStyles()
  const [email, setEmail] = React.useState('')

  return (
    <Box className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant='h3' className={classes.title}>
            Never Miss a new workshop
          </Typography>
          <Typography variant='body2' className={classes.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            display='flex'
            alignItems='center'
            width='100%'
            height='100%'
            justifyContent='center'
          >
            <OutlinedInput
              type='email'
              data-testid='email-input'
              id='outlined-adornment-weight'
              placeholder='Your email address'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              endAdornment={
                <InputAdornment position='end'>
                  <SendIcon color={'primary'} />
                </InputAdornment>
              }
              className={classes.email}
              aria-describedby='outlined-weight-helper-text'
              inputProps={{
                'aria-label': 'weight',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
