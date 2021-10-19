import React from 'react'
import {
  Box,
  Grid,
  makeStyles,
  Typography,
  Modal,
  IconButton,
} from '@material-ui/core'
import hubspotFormIds from '@/const/hubspot-form-ids'
import HubSpotForm from '@/components/molecules/hubspotform'
import CtaButton from '@/components/atoms/CtaButton'
import CloseIcon from '@material-ui/icons/Close'

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
  modal: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.grey.dark,
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    padding: theme.spacing(2, 0, 0, 0),
    overflow: 'scroll',
    [theme.breakpoints.up('md')]: {
      width: '50vw',
      height: '85vh',
      borderRadius: '16px',
      top: '15%',
      left: '50%',
      transform: 'translate(-50%, -10%)',
      boxShadow: theme.shadows[5],
    },
  },
  closeModalButton: {
    marginRight: 5,
    color: theme.palette.grey.dark,
  },
}))
export default function NeverMiss() {
  const classes = useStyles()
  const [openModal, setOpenModal] = React.useState(false)
  const _renderWorkshopForm = () => (
    <Box pt={0} pb={10} px={[2, 10]}>
      <h1>Sign Up</h1>
      <HubSpotForm formId={hubspotFormIds.NEVER_MISS_WORKSHOP_FORM} />
    </Box>
  )
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
            <CtaButton
              variant='contained'
              color='primary'
              width='100%'
              size='large'
              label='Sign up'
              onclick={() => setOpenModal(true)}
            />
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby='Workshop Signup'
        aria-describedby='A pop-up form to sign up for the Workshops'
      >
        <Box className={classes.modal}>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='flex-end'
            mb={2}
            pl={2}
            pr={2}
          >
            <IconButton
              aria-label='Close modal button'
              className={classes.closeModalButton}
            >
              <CloseIcon size='small' onClick={() => setOpenModal(false)} />
            </IconButton>
          </Box>
          {_renderWorkshopForm()}
        </Box>
      </Modal>
    </Box>
  )
}
