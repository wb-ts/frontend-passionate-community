import React, { Fragment } from 'react'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Box, Divider } from '@mui/material'
import PropTypes from 'prop-types'
import { options } from '../../../const'
import paths from '../../../paths/path'
import TextStyle from '../../atoms/TextStyle'
import HorizontalCard from '../../molecules/horizontalcard'

/**
 * This component displays Profile Summary information. It can display multiple profiles.
 *
 * @param {array} profiles
 * @param {string} title
 * @returns {Component}
 */
const ProfileSummary = ({ profiles, title }) =>
  profiles ? (
    <Box>
      {title && (
        <Box mb={5}>
          <TextStyle variant='h3'>{title}</TextStyle>
        </Box>
      )}
      {profiles.map((item, index) => {
        const divider = profiles.length > index + 1
        return (
          <Fragment key={index}>
            <Box my={3}>
              <HorizontalCard
                key={item.slug}
                body={documentToReactComponents(item.description.json, options)}
                image={item.thumbnail.imgSrc}
                ctaLink={paths.profile({ slug: item.slug })}
                reverse
                variant='author'
              />
            </Box>
            {divider && <Divider />}
          </Fragment>
        )
      })}
    </Box>
  ) : (
    <></>
  )

export default ProfileSummary

ProfileSummary.propTypes = {
  title: PropTypes.string,
  profiles: PropTypes.arrayOf(
    (propValue, key, componentName, location, propFullName) => {
      if (propValue[key]['__typename'] !== 'Profile') {
        return new Error(
          'Invalid prop `' +
            propFullName +
            '` supplied to' +
            ' `' +
            componentName +
            '`. Validation failed.'
        )
      }
    }
  ),
}
