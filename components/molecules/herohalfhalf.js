import React from 'react'
import {
  Box,
  Grid,
  Container,
  Modal,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import CtaButton from '@/components/atoms/CtaButton'
import TextStyle from '@/components/atoms/TextStyle'
import TopicTag from '@/components/molecules/TopicTag'
import { useRouter } from 'next/router'
import SnipcartButton from '@/components/Snipcart/SnipcartButton'
import ReactMarkdown from 'react-markdown'
import Typography from '@mui/material/Typography'
import MembershipDetails from '../UserAccount/MembershipDetails'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.light,
    flexDirection: 'column-reverse !important',
    [theme.breakpoints.up('sm')]: {
      height: '375px',
      flexDirection: ({ imagePos }) =>
        imagePos == 'right' ? 'row !important' : 'row-reverse !important',
    },
    [theme.breakpoints.up('md')]: {
      height: '500px',
    },
  },
  content: {
    height: '100%',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      paddingLeft: ({ imagePos }) =>
        imagePos == 'left' ? theme.spacing(5) : theme.spacing(1),
      justifyContent: 'flex-start',
    },
    [theme.breakpoints.up('xl')]: {
      padding: 0,
    },
  },
  media: {
    backgroundColor: theme.palette.primary.main,
    objectFit: 'cover',
    overflow: 'hidden',
    height: 375,
    maxHeight: 375,
    width: '100%',
    alignSelf: 'center',
    borderRadius: '0 0 0 96px',
    boxShadow: ({ variant }) =>
      variant == 'membership'
        ? '0px 12px 17px rgba(0, 0, 0, 0.03), 0px 5px 22px rgba(0, 0, 0, 0.04), 0px 7px 8px rgba(0, 0, 0, 0.08)'
        : 'none',
    display: 'flex',

    [theme.breakpoints.up('md')]: {
      width: 500,
      height: 500,
      maxHeight: 500,
      borderRadius: '8px 8px 8px 96px',
    },
  },
  mediaDescription: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    alignItems: 'center',
  },
  link: {
    textDecoration: 'underline',
  },
  label: {
    paddingRight: theme.spacing(3),
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: ({ variant }) => (variant == 'membership' ? 'start' : 'center'),
    textAlign: ({ variant }) => (variant == 'membership' ? 'start' : 'center'),
    [theme.breakpoints.up('md')]: {
      flexDirection: ({ variant }) =>
        variant == 'membership' ? 'column' : 'row',
    },
  },
  button: {
    width: '100%',
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: ({ variant }) => (variant == 'membership' ? '50%' : 'auto'),
    },
    '& a': {
      justifyContent: 'center !important',
    },
    '& button': {
      width: '100%',
    },
    '& .MuiButton-label': {
      fontWeight: 600,
    },
  },
  description: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '85%',
    },
  },

  modal: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.grey.dark,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    padding: theme.spacing(8, 7, 8, 7),
    // overflow: 'scroll',
    [theme.breakpoints.up('sm')]: {
      height: 'auto',
      width: theme.typography.pxToRem(440),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: theme.shadows[5],
    },
  },
  modalButtoWrap: {
    display: 'block',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  select: {
    display: 'flex',
    padding: 0,
    // justifyContent: 'center',
    '& svg': {
      color: theme.palette.main,
    },
  },
  formControl: {
    margin: theme.spacing(0),
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(2),
    },

    // padding: '11px 32px 11px 11px'
  },
  planDetails: {
    display: 'flex',
  },
  planLabel: {
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 400,
    lineHeight: theme.typography.pxToRem(24),
    letterSpacing: 0.2,
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(16),
      lineHeight: theme.typography.pxToRem(26),
    },
  },
  planName: {
    marginLeft: theme.spacing(1),
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 700,
    lineHeight: theme.typography.pxToRem(24),
    letterSpacing: 0.2,
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(16),
      lineHeight: theme.typography.pxToRem(26),
    },
  },
  selectLabel: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 600,
    lineHeight: theme.typography.pxToRem(22),
    letterSpacing: 0.2,
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(14),
      lineHeight: theme.typography.pxToRem(24),
    },
  },
  yourPlan: {
    display: 'flex',
    alignItems: 'center',
  },
}))

export default function HeroHalfHalf({
  label,
  title,
  description,
  date,
  time,
  ctaLabel1,
  ctaLink1,
  ctaLabel2,
  ctaLink2,
  image,
  imageAlt,
  imagePos = 'right',
  snipcart,
  variant,
  membershipData,
  upgradeData,
}) {
  const classes = useStyles({ imagePos, variant })
  const router = useRouter()

  const [openModal, setOpenModal] = React.useState(false)
  const [confirmStatus, setConfirmStatus] = React.useState(false)
  const [value, setValue] = React.useState(0)
  const [upgradeId, setUpgradeId] = React.useState('')

  const handleClose = () => {
    setValue(0)
    setOpenModal(false)
    setConfirmStatus(false)
  }
  const handleChange = (event) => {
    setUpgradeId(upgradeData[event.target.value].upgradeId)
    console.log('upgrade Id ', upgradeData[event.target.value].upgradeId)
    if (event.target.value != 0) {
      setValue(event.target.value)
      setConfirmStatus(true)
    } else {
      setValue(0)
      setConfirmStatus(false)
    }
  }
  const confirmChange = () => {
    if (value != 0) {
      setConfirmStatus(false)
      setOpenModal(false)
    }
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={6} className={classes.content}>
        <Box ml={[3, 2, 0]} mr={[3, 0]} width='468px'>
          {label && (
            <Box pb={1}>
              <TopicTag
                label={label}
                variant='special'
                color='black'
                textTransform='uppercase'
              />
            </Box>
          )}
          {title && (
            <Box>
              <TextStyle variant='h1'>{title}</TextStyle>
              {date && time ? (
                <>
                  <TextStyle variant='subtitle2'>{`${date} - ${time} EST`}</TextStyle>
                </>
              ) : null}
              <Box mt={2} className={classes.description}>
                <TextStyle variant='subtitle2'>
                  {Array.isArray(description) ? (
                    description
                  ) : (
                    <ReactMarkdown children={description} />
                  )}
                </TextStyle>
              </Box>
            </Box>
          )}

          <Box mt={5} className={classes.buttonContainer}>
            {ctaLabel1 && variant != 'membership' && (
              <Box pt={0} className={classes.button}>
                <CtaButton
                  variant='contained'
                  color='primary'
                  width='100%'
                  size='large'
                  label={ctaLabel1}
                  onclick={
                    Object.prototype.toString.call(ctaLink1) ==
                    '[object Function]'
                      ? () => ctaLink1()
                      : undefined
                  }
                  href={
                    Object.prototype.toString.call(ctaLink1) !=
                    '[object Function]'
                      ? ctaLink1
                      : null
                  }
                  snipcart={snipcart}
                />
              </Box>
            )}
            {ctaLabel1 && variant == 'membership' && upgradeData.length > 1 && (
              <Box pt={0} className={classes.button}>
                <CtaButton
                  variant='contained'
                  color='primary'
                  width='100%'
                  size='large'
                  label={ctaLabel1}
                  onclick={() => setOpenModal(true)}
                  href={
                    Object.prototype.toString.call(ctaLink1) !=
                    '[object Function]'
                      ? ctaLink1
                      : null
                  }
                  snipcart={snipcart}
                />
              </Box>
            )}

            {snipcart && (
              <Box pt={[2, 0, 0]} className={classes.button}>
                <SnipcartButton snipcart={snipcart} />
              </Box>
            )}

            {ctaLabel2 && variant != 'membership' && (
              <Box pt={[2, 2, 0]} className={classes.button}>
                <CtaButton
                  variant='outlined'
                  color='primary'
                  fullWidth
                  size='large'
                  label={ctaLabel2}
                  href={ctaLink2}
                />
              </Box>
            )}
            {ctaLabel2 && variant == 'membership' && (
              <Box pt={[2, 2, 4]} className={classes.button}>
                <CtaButton
                  variant='outlined'
                  color='primary'
                  fullWidth
                  size='large'
                  label={ctaLabel2}
                  // href={ctaLink2}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Grid>
      {variant != 'membership' ? (
        <Grid item xs={12} sm={6} className={classes.media}>
          {image ? (
            <img
              src={image ? image : '/images/ASCDImageFiller.png'}
              alt={imageAlt}
              style={{ width: '100%', height: 'inherit', objectFit: 'cover' }}
            />
          ) : (
            'Image'
          )}
        </Grid>
      ) : (
        <Grid item xs={12} sm={6} className={classes.media}>
          <Grid xs={4} sm={4}>
            {image ? (
              <img
                src={image ? image : '/images/ASCDImageFiller.png'}
                alt={imageAlt}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              'Image'
            )}
          </Grid>
          <Grid xs={8} sm={8} className={classes.mediaDescription}>
            <Container maxWidth='sm'>
              <MembershipDetails membershipData={membershipData} />
            </Container>
          </Grid>
        </Grid>
      )}
      {upgradeData && (
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <div className={classes.modal}>
            <Grid container className={classes.modalBg} spacing={1}>
              <Grid item xs={12} md={4} className={classes.yourPlan}>
                <TextStyle variant='subtitle2' className={classes.yourPlan}>
                  Your Plan:
                </TextStyle>
              </Grid>
              <Grid item xs={12} md={8}>
                <FormControl
                  className={classes.formControl}
                  sx={{ m: 0, width: '100%' }}
                  md={{ m: 10, minWidth: 220 }}
                >
                  <Select
                    labelId='select-membership-label'
                    id='select-membership'
                    value={value}
                    onChange={handleChange}
                    className={classes.select}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {upgradeData.map((membership, index) => (
                      <MenuItem value={index} key={index}>
                        {membership.slug}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Box mt={4}>
                {confirmStatus ? (
                  <Typography variant='h6'>You will gain access to:</Typography>
                ) : (
                  <Typography variant='h6'>Includes:</Typography>
                )}
              </Box>
              <Box>{upgradeData[value]?.description}</Box>
            </Grid>
            <Grid className={classes.modalButtoWrap}>
              <Grid item xs={12} sm={12} md={6}>
                {confirmStatus && (
                  <Box>
                    <CtaButton
                      variant='contained'
                      fullWidth
                      color='primary'
                      label='Upgrade'
                      id={upgradeId}
                    />
                  </Box>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Box pt={[2, 2, 0]}>
                  <CtaButton
                    variant='outlined'
                    fullWidth
                    color='primary'
                    label='Cancel'
                    onclick={handleClose}
                  />
                </Box>
              </Grid>
            </Grid>
          </div>
        </Modal>
      )}
    </Grid>
  )
}
