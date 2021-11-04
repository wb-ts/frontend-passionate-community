import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { getContentText } from '../data-transformations'
import MEMBERSHIP_BY_SLUG_QUERY from '../apollo-client/schema/membershipBySlug.graphql'

/**
 * Manages the membership data retrieval
 *
 * @returns {Object}
 */
const useMembership = (slug) => {
  const { loading, error, data } = useQuery(MEMBERSHIP_BY_SLUG_QUERY, {
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      where: {
        slug: slug,
      },
    },
  })

  const [description, setDescription] = useState(null)

  useEffect(() => {
    if (data?.membershipCollection?.items?.length > 0) {
      setDescription(
        getContentText(data?.membershipCollection?.items[0]?.description?.json)
      )
    }
  }, [data])

  return {
    loading,
    description: description,
  }
}

export default useMembership
