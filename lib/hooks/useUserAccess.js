import { useEffect, useState } from 'react'
import { useQuery, useReactiveVar } from '@apollo/client'
import { userAccountIdVar } from '../apollo-client/cache'
import USER_ACCESS_BYID_QUERY from '../../lib/apollo-client/schema/userAccessbyId.graphql'
import {
  accessInfoToMembershipData,
  getContentText,
} from '../data-transformations'
import { client } from '@/lib/contentful'

/**
 * Manages the user access data retrieval
 *
 * @returns {Object}
 */
const useUserAccess = () => {
  // const { loading, error, data } = useQuery(USER_ACCESS_BYID_QUERY, {
  //   variables: { userId: useReactiveVar(userAccountIdVar) },
  // })
  const { loading, error, data } = useQuery(USER_ACCESS_BYID_QUERY, {
    variables: { userId: '83ecab7a-3661-4080-bb1b-8a67a4a3dec9' },
  })

  const [userName, setUserName] = useState('')
  const [membershipName, setMembershipName] = useState('')
  const [autoRenew, setAutoRenew] = useState(false)
  const [expireDate, setExpireDate] = useState('')
  const [price, setPrice] = useState()
  const [period, setPeriod] = useState('')
  const [membershipKeyword, setMembershipKeyword] = useState('')
  useEffect(() => {
    if (data?.access?.items) {
      const {
        userName: _userName,
        membershipName: _membershipName,
        autoRenew: _autoRenew,
        expireDate: _expireDate,
        price: _price,
        period: _period,
        membershipKeyword: _membershipKeyword,
      } = accessInfoToMembershipData(data?.access?.items)
      setUserName(_userName)
      setMembershipName(_membershipName)
      setAutoRenew(_autoRenew)
      setExpireDate(_expireDate)
      setPrice(_price)
      setPeriod(_period)
      setMembershipKeyword(_membershipKeyword)
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
  }
}

export default useUserAccess
