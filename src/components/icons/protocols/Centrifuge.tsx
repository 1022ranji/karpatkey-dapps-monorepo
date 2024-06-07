import React from 'react'
import NextImage from 'next/image'

export const Centrifuge = ({ width, height }: { width: number; height: number }) => (
  <NextImage alt="logo" src="/images/protocols/centrifuge.svg" width={width} height={height} />
)
