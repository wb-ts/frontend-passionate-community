import { useQuery } from '@apollo/client'
import PROFILE_SUMMARY_BY_ID_QUERY from '../schema/profileSummaryById.graphql'

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

  /**
   * @todo Decide how to log errors and handle errors
   */
  if (error) {
    return {
      loading: false,
      error: true,
      errorMessage: 'Could not fetch profile(s)',
      data: null,
    }
  }

  return {
    loading,
    data: data?.profileCollection?.profiles || [],
  }
}

export default useProfileSummary
