import React from 'react'
import Image from 'next/image'

const NextImageWrapper = ({ src, ...restProps }) => {
  return (
    <Image
      src={src}
      placeholder='blur'
      blurDataURL={
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMT6/eDwAEkAIKgUV8iQAAAABJRU5ErkJggg=='
      }
      {...restProps}
    />
  )
}

export default NextImageWrapper
