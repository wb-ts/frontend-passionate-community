import { InMemoryCache, makeVar } from '@apollo/client'
import { pianoClient } from '../utils'

export const userAccountIdVar = makeVar(
  pianoClient?.user?.getProvider()?.getUser()?.uid
)

export const hasPaidMembershipVar = makeVar(false)
export const hasMemberBookPriceVar = makeVar(false)

const typePolicies = {
  UserAccount: {
    fields: {
      id: {
        read: () => {
          return userAccountIdVar()
        },
      },
    },
  },
}

export default new InMemoryCache({ typePolicies })
