import { getPianoClient } from '@/lib/utils'
import { useState, useEffect } from 'react'

/**
 * This hook provides the access list from piano based on the provided user id.
 * It returns a list of access information including the term(s) a user has been assigned.
 *
 * @param {String} uid Piano's user identifier
 * @returns {Array}
 */
const useUserAccess = (uid) => {
  const [userAccessData, setUserAccessData] = useState([])
  const pianoClient = getPianoClient()

  useEffect(() => {
    if (uid) {
      pianoClient.push([
        'init',
        function () {
          pianoClient.api?.callApi(
            '/publisher/user/access/list',
            {
              api_token: process.env.NEXT_PUBLIC_PIANO_API_KEY,
              uid: uid,
            },
            (data) => {
              if (data.code === 0) {
                setUserAccessData(data.accesses)
              } else {
                throw Error(`Code: ${data.code} - ${data.message}`)
              }
            }
          )
        },
      ])
    } else {
      setUserAccessData([])
    }
  }, [uid])

  return userAccessData
}

export default useUserAccess
