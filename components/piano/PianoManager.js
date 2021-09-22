import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '@/context/state'
import Cookies from 'universal-cookie'
import { hostnameForCookie } from '@/lib/utils'
const cookies = new Cookies()
/**
 * Piano Manager Placeholder for future development.
 * Currently implementing our Activate Integration cookie
 *
 * @return {Component}
 */
const PianoManager = () => {
  const { user } = useContext(AppContext)

  useEffect(() => {
    if (user?.id && !cookies.get('.ASCD')) {
      var url = process.env.NEXT_PUBLIC_COOKIE_API_URL + user.id
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
    } else if (!user?.id) {
      cookies.remove('.ASCD', { path: '/', domain: hostnameForCookie })
    }
  }, [user])

  return <></>
}

export default PianoManager
