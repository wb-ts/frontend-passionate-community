import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ViewAllCTA from '@/components/atoms/ViewAllCTA'
import CtaButton from '@/components/atoms/CtaButton'
import TextStyle from '@/components/atoms/TextStyle'

const useStyles = makeStyles((theme) => ({
  textcta: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    backgroundColor: (props) =>
      props.bgColor == 'primary'
        ? theme.palette.primary.main
        : theme.palette.grey.extraLight,
    color: (props) =>
      props.bgColor == 'primary' ? theme.palette.common.white : 'initial',
  },
  underline: {
    textDecoration: 'underline',
  },
}))
export default function TextCTA({
  title,
  description,
  button,
  ctaLabel,
  ctaLink,
  ...props
}) {
  const classes = useStyles(props)

  return (
    <Box py={5} className={classes.textcta}>
      {title && (
        <Box maxWidth='650px' textAlign='center' px={3}>
          <TextStyle variant='h4'>{title}</TextStyle>
        </Box>
      )}
      {description && (
        <Box maxWidth='650px' textAlign='center' pt={1} px={3} mb={2}>
          <TextStyle variant='subtitle1'>{description}</TextStyle>
        </Box>
      )}
      {ctaLabel && (
        <Box>
          {button ? (
            <CtaButton
              variant='contained'
              color={props.bgColor == 'primary' ? 'secondary' : 'primary'}
              width='100%'
              height='42'
              label={ctaLabel}
              href={ctaLink}
            />
          ) : (
            <ViewAllCTA href={ctaLink} label={ctaLabel} lg />
          )}
        </Box>
      )}
    </Box>
  )
}
