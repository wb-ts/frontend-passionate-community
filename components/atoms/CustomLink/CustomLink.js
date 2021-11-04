import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import NextLink from 'next/link'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  small: {
    fontWeight: '500',
    fontSize: theme.typography.pxToRem(14),
    lineHeight: theme.typography.pxToRem(24),
    letterSpacing: '0.2px',
    color: (props) => (props.color ? props.color : theme.palette.primary.main),
    textDecoration: 'underline',
    '&:hover, &:focus': {
      color: (props) =>
        props.colorHover ? props.colorHover : theme.palette.hover.main,
    },
  },
  medium: {
    fontWeight: '500',
    fontSize: theme.typography.pxToRem(16),
    lineHeight: theme.typography.pxToRem(26),
    letterSpacing: '0.2px',
    color: (props) => (props.color ? props.color : theme.palette.primary.main),
    textDecoration: 'underline',
    '&:hover, &:focus': {
      color: (props) =>
        props.colorHover ? props.colorHover : theme.palette.hover.main,
    },
  },
  large: {
    fontWeight: '500',
    fontSize: theme.typography.pxToRem(18),
    lineHeight: theme.typography.pxToRem(30),
    letterSpacing: '0.2px',
    color: (props) => (props.color ? props.color : theme.palette.primary.main),
    textDecoration: 'underline',
    '&:hover, &:focus': {
      color: (props) =>
        props.colorHover ? props.colorHover : theme.palette.hover.main,
    },
  },
}))

export default function CustomLink({
  label,
  href,
  size,
  clickAction,
  scroll,
  shallow,
  ...props
}) {
  const classes = useStyles(props)

  const LinkSize = (size) => {
    if (size === 'small') {
      return classes.small
    } else if (size === 'medium') {
      return classes.medium
    } else if (size === 'large') {
      return classes.large
    } else {
      return classes.medium
    }
  }

  return href ? (
    <NextLink href={href} passHref scroll={scroll} shallow={shallow}>
      <a className={LinkSize(size)} target={props?.target ? props?.target : ''}>
        {props.children ? <>{props.children}</> : <>{label}</>}
      </a>
    </NextLink>
  ) : (
    <a
      className={LinkSize(size)}
      onClick={() => (clickAction ? clickAction() : void 0)}
      scroll={scroll}
      shallow={shallow}
    >
      {props.children ? <>{props.children}</> : <>{label}</>}
    </a>
  )
}

CustomLink.propTypes = {
  label: PropTypes.string,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  size: PropTypes.string,
  clickAction: PropTypes.func,
  scroll: PropTypes.bool,
  shallow: PropTypes.bool,
  color: PropTypes.string,
  colorHover: PropTypes.string,
}
