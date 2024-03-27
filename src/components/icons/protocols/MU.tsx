import React from 'react'
import NextImage from 'next/image'

export const MU = ({ width, height }: { width: number; height: number }) => (
  <div style={{ borderRadius: '50%', overflow: 'hidden', width, height }}>
    <NextImage
      alt="logo"
      src="/images/protocols/mu.jpg"
      width={width}
      height={height}
      objectFit="cover"
    />
  </div>
)
