import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Box, Divider } from '@material-ui/core'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import options from '../../../const/options'

import paths from '../../../paths/path'
import TextStyle from '../../atoms/TextStyle'
import HorizontalCard from '../../molecules/horizontalcard'
import { contentfulThumbnailToImageUrl } from '../../../lib/data-transformations'

import useProfileSummary from '../../../lib/hooks/useProfileSummary'

/**
 * This component can take an Array of profile ids and fetch the necessary data to display. It can show 1 or many profiles.
 * @returns {Component}
 */
const ProfileSummary = ({ ids, title }) => {
  const { loading, profiles } = useProfileSummary(ids)

  return profiles && !loading ? (
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
                image={contentfulThumbnailToImageUrl(item.thumbnail)}
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
}

export default ProfileSummary

ProfileSummary.propTypes = {
  ids: PropTypes.array.isRequired,
  title: PropTypes.string,
}
