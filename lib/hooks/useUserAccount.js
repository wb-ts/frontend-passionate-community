import { useEffect, useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import {
  userAccountIdVar,
  hasPaidMembershipVar,
  hasMemberBookPriceVar,
} from '../../lib/apollo-client/cache'
import USER_ACCOUNT_QUERY from '../../lib/apollo-client/schema/userAccount.graphql'
import {
  validatePaidMembership,
  hasMemberBookPrice,
} from '../../lib/access-validator'

/**
 * Manages the user account data retrieval and updating of related user account information.
 * This hook is triggered by a reactive variable being updated.
 *
 * @returns {Object}
 */
const useUserAccount = () => {
  const { loading, error, data } = useQuery(USER_ACCOUNT_QUERY, {
    variables: { userId: useReactiveVar(userAccountIdVar) },
  })
  const [masterCustomerId, setMasterCustomerId] = useState()

  const getMasterCustomerId = () => {
    const results = data?.userAccount?.user?.custom_fields?.filter((field) => {
      return field.fieldName === 'master_customer_id'
    })
    return results?.length > 0 ? results[0]?.value : undefined
  }

  useEffect(() => {
    hasPaidMembershipVar(
      validatePaidMembership(data?.userAccount?.access?.items)
    )
    hasMemberBookPriceVar(hasMemberBookPrice(data?.userAccount?.access?.items))

    setMasterCustomerId(getMasterCustomerId())
  }, [data])

  return {
    loading,
    userAccount: data?.userAccount,
    userAccountUser: data && {
      ...data.userAccount.user,
      masterCustomerId,
    },
    userAccountAccess: data?.userAccount?.access?.items,
  }
}

export default useUserAccount
