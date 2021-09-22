import React from 'react'
import { Box } from '@material-ui/core'

const loadPianoAccount = async (tp) => {
  try {
    await tp.push([
      'init',
      function () {
        tp.myaccount?.show({
          displayMode: 'inline',
          containerSelector: '#my-account',
        })
      },
    ])
  } catch (e) {
    throw Error(e.message)
  }
}

export default function PianoAccount({}) {
  let tp = null
  if (typeof window !== 'undefined' && typeof window.tp !== 'undefined') {
    tp = window.tp
    if (tp) {
      loadPianoAccount(tp)
    }
  }

  return <Box id='my-account-title'></Box>
}
