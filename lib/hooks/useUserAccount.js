import { useEffect, useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import {
  validatePaidMembership,
  hasMemberBookPrice,
} from '../../lib/access-validator'
import {
  userAccountIdVar,
  hasPaidMembershipVar,
  hasMemberBookPriceVar,
} from '../../lib/apollo-client/cache'
import USER_ACCOUNT_BY_ID_QUERY from '../../lib/schema/userAccountById.graphql'

/**
 * Manages the user account data retrieval and updating of related user account information.
 * This hook is triggered by a reactive variable being updated.
 *
 * @returns {Object}
 */
const useUserAccount = () => {
  const userAccountId = useReactiveVar(userAccountIdVar)
  const { loading, error, data } = useQuery(USER_ACCOUNT_BY_ID_QUERY, {
    variables: { userId: userAccountId },
  })
  const [masterCustomerId, setMasterCustomerId] = useState()

  const getMasterCustomerId = () => {
    const results = data?.userAccount?.user?.custom_fields?.filter((field) => {
      return field.fieldName === 'master_customer_id'
    })
    return results?.length > 0 ? results[0]?.value : undefined
  }

  useEffect(() => {
    const isPaidMember = validatePaidMembership(
      data?.userAccount?.access?.items
    )
    if (isPaidMember !== hasPaidMembershipVar()) {
      hasPaidMembershipVar(isPaidMember)
    }
    const isMembeBookPrice = hasMemberBookPrice(
      data?.userAccount?.access?.items
    )
    if (isMembeBookPrice !== hasMemberBookPriceVar()) {
      hasMemberBookPriceVar(isMembeBookPrice)
    }

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
