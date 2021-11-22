import { useEffect, useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { userAccountIdVar } from '../apollo-client/cache'
import USER_SUBSCRIPTION_BYID_QUERY from '../../lib/apollo-client/schema/userSubscriptionById.graphql'
import { subscriptionInfoToMembershipData } from '../data-transformations'

/**
 * Manages the user access data retrieval
 *
 * @returns {Object}
 */
const useUserSubscription = () => {
  const userId = useReactiveVar(userAccountIdVar)
  const { loading, error, data } = useQuery(USER_SUBSCRIPTION_BYID_QUERY, {
    variables: { userId: userId },
    skip: !userId,
  })
  //select monthly user: 83ecab7a-3661-4080-bb1b-8a67a4a3dec9
  //basic annual user: d225ca4e-874f-44da-8bc4-fae87bca4f15
  //premium annual user: 1282232
  //leadership summit user(will be free user because
  // no membership for select, basic, premium?): 24045ac1-2f76-42c6-9300-3abf7ee8e708
  // const { loading, error, data } = useQuery(USER_ACCESS_BYID_QUERY, {
  //   variables: { userId: '83ecab7a-3661-4080-bb1b-8a67a4a3dec9' },
  // })

  const [userName, setUserName] = useState('')
  const [membershipName, setMembershipName] = useState('')
  const [autoRenew, setAutoRenew] = useState(false)
  const [expireDate, setExpireDate] = useState('')
  const [price, setPrice] = useState()
  const [period, setPeriod] = useState('')
  const [membershipKeyword, setMembershipKeyword] = useState('')
  const [subscriptionId, setSubscriptionId] = useState('')
  useEffect(() => {
    if (data?.subscription?.items) {
      const {
        userName: _userName,
        membershipName: _membershipName,
        autoRenew: _autoRenew,
        expireDate: _expireDate,
        price: _price,
        period: _period,
        membershipKeyword: _membershipKeyword,
        subscription_id,
      } = subscriptionInfoToMembershipData(data?.subscription?.items)
      setUserName(_userName)
      setMembershipName(_membershipName)
      setAutoRenew(_autoRenew)
      setExpireDate(_expireDate)
      setPrice(_price)
      setPeriod(_period)
      setMembershipKeyword(_membershipKeyword)
      setSubscriptionId(subscription_id)
    }
  }, [data])

  return {
    loading,
    userName,
    membershipName,
    autoRenew,
    expireDate,
    price,
    period,
    membershipKeyword,
    subscriptionId,
  }
}

export default useUserSubscription
