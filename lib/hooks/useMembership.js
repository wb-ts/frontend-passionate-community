import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import MEMBERSHIP_BY_SLUG_QUERY from '../apollo-client/schema/membershipBySlug.graphql'

/**
 * Manages the membership data retrieval
 *
 * @returns {Object}
 */
const useMembership = (slug, period) => {
  const { loading, error, data } = useQuery(MEMBERSHIP_BY_SLUG_QUERY, {
    variables: {
      preview: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW === 'true',
      where: {
        slug: slug,
      },
    },
    skip: !slug || !period,
  })

  const [description, setDescription] = useState(null)
  const [upgradeData, setUpgradeData] = useState([])
  useEffect(() => {
    if (data?.membershipCollection?.items?.length > 0) {
      setDescription(data?.membershipCollection?.items[0]?.description)
      const _upgradeData =
        data?.membershipCollection?.items[0]?.upgradeMembershipCollection?.items.map(
          (item) => ({
            slug: item.slug,
            upgradeId: item.upgradeId,
            description: item.description,
          })
        )
      setUpgradeData(_upgradeData)
    }
  }, [data])

  return {
    loading,
    description: description,
    getMoreText:
      period == 'month'
        ? data?.membershipCollection?.items[0]?.getMoreMonth
        : data?.membershipCollection?.items[0]?.getMoreYear,
    upgradeData: upgradeData,
  }
}

export default useMembership
