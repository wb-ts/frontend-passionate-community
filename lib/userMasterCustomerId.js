import { getPianoClient } from '@/lib/utils'
import { useState, useEffect } from 'react'

/**
 * This hook provides the user custom field from piano based on the provided user id.
 * It returns a list of access information including the term(s) a user has been assigned.
 *
 * @param {String} uid Piano's user identifier
 * @returns {Array}
 */
const userMasterCustomerId = (uid) => {
  const [userMasterId, setMasterId] = useState([])
  const pianoClient = getPianoClient()

  useEffect(() => {
    if (uid) {
      pianoClient.push([
        'init',
        function () {
          pianoClient.api?.callApi(
            '/publisher/user/get',
            {
              api_token: process.env.NEXT_PUBLIC_PIANO_API_KEY,
              uid: uid,
            },
            (data) => {
              if (data.code === 0) {
                console.log('masterId:', data)
                setMasterId(data.user.custom_fields[0].value)
                console.log(data.user.custom_fields[0].value)
              } else {
                throw Error(`Code: ${data.code} - ${data.message}`)
              }
            }
          )
        },
      ])
    } else {
      setMasterId([])
    }
  }, [uid])

  return userMasterId
}

export default userMasterCustomerId
