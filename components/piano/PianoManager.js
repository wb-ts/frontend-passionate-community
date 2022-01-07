import React, { useContext, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import Cookies from 'universal-cookie'
import { userAccountIdVar } from '../../lib/apollo-client/cache'
import { hostnameForCookie, pianoClient } from '../../lib/utils'

const cookies = new Cookies()

/**
 * Piano Manager is used to manage api interactions with the piano client sdk.
 * This also is implementing our Activate Integration cookie
 *
 * The manager updates the userAccountIdVar which will trigger updates to the User Account query.
 * This will then update the site and components that use User Account related info.
 *
 * @return {Component}
 */
const PianoManager = () => {
  const userAccountId = useReactiveVar(userAccountIdVar)

  const setUserAccountId = () => {
    const user = pianoClient?.user?.getProvider().getUser()
    if (user) {
      userAccountIdVar(user?.uid)
    } else {
      userAccountIdVar(undefined)
    }
  }

  useEffect(() => {
    pianoClient?.push([
      'init',
      function () {
        setUserAccountId()
      },
    ])
    pianoClient?.push([
      'addHandler',
      'loginSuccess',
      function (data) {
        userAccountIdVar(data?.params?.uid)
      },
    ])
  }, [])

  useEffect(() => {
    if (userAccountId && !cookies.get('.ASCD')) {
      var url = process.env.NEXT_PUBLIC_COOKIE_API_URL + userAccountId
      fetch(url, {
        method: 'GET',
      })
        .then((res) => res.json())
        .then((response) => {
          cookies.set('.ASCD', response, {
            path: '/',
            domain: hostnameForCookie,
          })
        })
        .catch()
    } else if (!userAccountId) {
      cookies.remove('.ASCD', { path: '/', domain: hostnameForCookie })
    }
  }, [userAccountId])

  return <></>
}

/**
 * Calls the piano client to show the login screen
 */
export const pianoLogInHandler = () => pianoClient?.pianoId?.show()

/**
 * Calls the piano client to logout the user and clear client user account
 */
export const pianoLogOutHandler = () => {
  pianoClient?.user?.logout()
  userAccountIdVar(undefined)
}

export default PianoManager
