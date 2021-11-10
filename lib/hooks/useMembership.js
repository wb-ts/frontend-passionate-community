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
  const [upgradeData, setUpgradeData] = useState([])
  useEffect(() => {
    if (data?.membershipCollection?.items?.length > 0) {
      const _description = getContentText(
        data?.membershipCollection?.items[0]?.description?.json
      )
      setDescription(_description)
      const _upgradeData =
        data?.membershipCollection?.items[0]?.upgradeMembershipCollection?.items.map(
          (item) => ({
            slug: item.slug,
            upgradeId: item.upgradeId,
            description: getContentText(item.description.json),
          })
        )
      setUpgradeData(_upgradeData)
    }
  }, [data])

  return {
    loading,
    description: description,
    upgradeData: upgradeData,
  }
}

export default useMembership
