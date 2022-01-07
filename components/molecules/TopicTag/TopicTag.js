import React from 'react'
import { Chip, Typography, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { PropTypes } from 'prop-types'
import TextStyle from '../../atoms/TextStyle'

const useStyles = makeStyles((theme) => ({
  topic: {
    width: 'fit-content',
    textTransform: (restProps) => restProps.textTransform,
    marginRight: (restProps) =>
      restProps.marginRight ? restProps.marginRight : null,
    fontSize: theme.typography.pxToRem(14),
    fontWeight: 500,
    lineHeight: theme.typography.pxToRem(20),
    letterSpacing: '4%',
  },
  topicSmall: {
    width: 'fit-content',
    textTransform: (restProps) => restProps.textTransform,
    marginRight: (restProps) =>
      restProps.marginRight ? restProps.marginRight : null,
    fontSize: theme.typography.pxToRem(11),
    fontWeight: 500,
    lineHeight: theme.typography.pxToRem(20),
    letterSpacing: '4%',
  },
  specialTag: {
    width: 'fit-content',
    textTransform: (restProps) => restProps.textTransform,
    marginRight: (restProps) =>
      restProps.marginRight ? restProps.marginRight : null,
    borderRadius: '4px',
    background: 'transparent',
    backgroundColor: (restProps) =>
      restProps.color === 'white'
        ? 'rgba(0, 0, 0, 0.4)'
        : 'rgba(0, 0, 0, 0.05)',
    color: (restProps) =>
      restProps.color ? restProps.color : theme.palette.text.primary,
    height: '24px',
    marginBottom: theme.spacing(1),
  },
  whiteTag: {
    width: 'fit-content',
    textTransform: (restProps) => restProps.textTransform,
    marginRight: (restProps) =>
      restProps.marginRight ? restProps.marginRight : null,
    borderRadius: '4px',
    backgroundColor: theme.palette.background.light,
    color: theme.palette.text.primary,
  },
  premium: {
    width: 'fit-content',
    marginRight: (restProps) =>
      restProps.marginRight ? restProps.marginRight : null,
    backgroundColor: 'rgba(255, 140, 0, 0.12)',
    color: '#A45E0A',
    fontSize: theme.typography.pxToRem(11),
    fontWeight: 600,
    lineHeight: theme.typography.pxToRem(20),
    letterSpacing: 0.2,
  },
  premiumText: {
    textTransform: (restProps) => restProps.textTransform,
    color: '#A45E0A',
    fontSize: theme.typography.pxToRem(11),
    fontWeight: 600,
    lineHeight: theme.typography.pxToRem(20),
    letterSpacing: 0.2,
  },
  chipContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
}))

export default function TopicTag({
  label,
  onclick,
  ondelete,
  deleteIcon,
  variant,
  premium,
  ...restProps
}) {
  const classes = useStyles(restProps)

  const topic = (variant) => {
    if (variant === 'special') {
      return (
        <Box className={classes.chipContainer}>
          {premium && (
            <img
              src='/images/premium.png'
              alt='premium resources logo'
              style={{ width: '20px', marginRight: '8px' }}
            />
          )}
          <Chip
            data-testid='specialTag'
            label={<TextStyle variant='overline'>{label}</TextStyle>}
            onClick={onclick ? onclick : null}
            onDelete={ondelete ? ondelete : null}
            deleteIcon={deleteIcon}
            className={classes.specialTag}
            size='small'
          />
        </Box>
      )
    } else if (variant === 'white') {
      return (
        <Chip
          label={<TextStyle variant='overline'>{label}</TextStyle>}
          onClick={onclick ? onclick : null}
          onDelete={ondelete ? ondelete : null}
          deleteIcon={deleteIcon}
          className={classes.whiteTag}
        />
      )
    } else if (variant === 'premium') {
      return (
        <Box className={classes.chipContainer}>
          <img
            src='/images/premium.png'
            alt='premium resources logo'
            style={{ width: '30px', marginRight: '8px' }}
          />
          <Chip
            label={
              <Typography className={classes.premiumText}>{label}</Typography>
            }
            className={classes.premium}
          />
        </Box>
      )
    } else if (variant === 'basic') {
      return (
        <Chip
          label={label}
          data-testid='topic'
          onClick={onclick ? onclick : null}
          onDelete={ondelete ? ondelete : null}
          deleteIcon={deleteIcon}
          className={classes.topic}
          color='primary'
          size='medium'
        />
      )
    } else if (variant === 'basicSmall') {
      return (
        <Chip
          label={label}
          onClick={onclick ? onclick : null}
          onDelete={ondelete ? ondelete : null}
          deleteIcon={deleteIcon}
          className={classes.topicSmall}
          color='primary'
          size='medium'
        />
      )
    } else {
      return (
        <Chip
          label={label}
          onClick={onclick ? onclick : null}
          onDelete={ondelete ? ondelete : null}
          deleteIcon={deleteIcon}
          className={classes.topic}
          color={variant === 'basic' ? 'primary' : 'secondary'}
          size='small'
        />
      )
    }
  }

  return <>{topic(variant)}</>
}

TopicTag.propTypes = {
  label: PropTypes.string,
  onclick: PropTypes.func,
  ondelete: PropTypes.func,
  deleteIcon: PropTypes.object,
  variant: PropTypes.string,
  premium: PropTypes.bool,
  restProps: PropTypes.object,
}
