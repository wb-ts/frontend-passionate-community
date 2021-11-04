import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import PROFILE_SUMMARY_BY_ID_QUERY from '../apollo-client/schema/profileSummaryById.graphql'

/**
 * Manages the profile summary data retrieval
 *
 * @returns {Object}
 */
const useProfileSummary = (ids) => {
  const { loading, error, data } = useQuery(PROFILE_SUMMARY_BY_ID_QUERY, {
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      where: {
        sys: {
          id_in: ids,
        },
      },
    },
  })

  return {
    loading,
    profiles: data?.profileCollection?.profiles || [],
  }
}

export default useProfileSummary
