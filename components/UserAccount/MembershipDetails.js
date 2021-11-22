import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles'
import { Box, Modal, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import TextStyle from '@/components/atoms/TextStyle'
import CtaButton from '@/components/atoms/CtaButton'
import ReactMarkdown from 'react-markdown'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    display: 'flex',
    margin: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    minHeight: 384,
    height: '100%',
    width: '80%',
  },
  subtitle: {
    fontWeight: 400,
    fontSize: theme.typography.pxToRem(16),
    lineHeight: theme.typography.pxToRem(26),
  },
  membershipLabel: {
    fontWeight: 800,
    fontSize: theme.typography.pxToRem(24),
    lineHeight: theme.typography.pxToRem(34),
  },
  membershipStatus: {
    paddingLeft: theme.spacing(1), //grid padding
    textAlign: 'left',
  },
  membershipDetail: {
    paddingLeft: theme.spacing(2),
  },
  membershipRenew: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 500,
    lineHeight: theme.typography.pxToRem(20),
  },
  membershipDetailLink: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 500,
    lineHeight: theme.typography.pxToRem(20),
    textDecoration: 'underline',
  },

  currency: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: 600,
    lineHeight: theme.typography.pxToRem(24),
    letterSpacing: '0.02em',
  },
  price: {
    fontSize: theme.typography.pxToRem(56),
    fontWeight: 800,
    lineHeight: theme.typography.pxToRem(50),
    letterSpacing: '0.02em',
  },
  perMonthPopular: {
    color: theme.palette.common.white,
    opacity: 0.6,
    alignSelf: 'flex-end',
  },
  modal: {
    position: 'absolute',
    height: '100vh',
    width: '100vw',
    backgroundColor: theme.palette.common.white,

    [theme.breakpoints.up('sm')]: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 606,
      height: 702,
      boxShadow:
        '0px 12px 17px rgba(0, 0, 0, 0.03), 0px 5px 22px rgba(0, 0, 0, 0.04), 0px 7px 8px rgba(0, 0, 0, 0.08)',
      borderRadius: 8,
    },
  },
  closeModalButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.grey.dark,
  },
  modalTitle: {
    display: 'flex',
    alignItems: 'center',
    height: 77,
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(4),
    margin: 0,
    boxShadow:
      '0px 6px 10px rgba(0, 0, 0, 0.03), 0px 1px 18px rgba(0, 0, 0, 0.04), 0px 3px 5px rgba(0, 0, 0, 0.08)',
  },
  //
}))

const MembershipDetails = ({ membershipData }) => {
  const classes = useStyles()
  const [openModal, setOpenModal] = useState(false)

  return (
    <Box item xs={12} md={4} className={classes.root}>
      <Box className={classes.membershipStatus}>
        <TextStyle className={classes.subtitle}>Account Status</TextStyle>
        <TextStyle className={classes.membershipLabel}>
          {membershipData?.membershipName
            ? membershipData.membershipName
            : 'Free User'}
        </TextStyle>
        {membershipData?.membershipName && (
          <Box>
            <Box mt={1} mb={1} display='flex'>
              <TextStyle className={classes.currency}>$</TextStyle>
              <TextStyle className={classes.price}>
                {membershipData?.price}
              </TextStyle>
              <TextStyle
                variant='subtitle2'
                className={classes.perMonthPopular}
              >
                /
                {membershipData?.period === 'year'
                  ? 'annually'
                  : membershipData?.period}
              </TextStyle>
            </Box>
            <Box className={classes.membershipDetail}>
              <TextStyle className={classes.membershipRenew}>
                {membershipData?.autoRenew ? 'Renews' : 'Expires'}{' '}
                {membershipData?.expireDate}
              </TextStyle>

              <TextStyle
                onClick={() => setOpenModal(true)}
                className={classes.membershipDetailLink}
              >
                Membership Details
              </TextStyle>
            </Box>
          </Box>
        )}
      </Box>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className={classes.modal}>
          <Box className={classes.modalTitle}>
            <TextStyle variant='sessionDate'>Membership Details</TextStyle>
            <IconButton
              aria-label='Close modal button'
              className={classes.closeModalButton}
            >
              <CloseIcon size='small' onClick={() => setOpenModal(false)} />
            </IconButton>
          </Box>

          <Box mt={5} pl={5}>
            <TextStyle variant='sessionDate'>Includes:</TextStyle>
            <ReactMarkdown>{membershipData?.description}</ReactMarkdown>
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default MembershipDetails
