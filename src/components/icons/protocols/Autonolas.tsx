import React from 'react'
import NextImage from 'next/image'

export const Autonolas = ({ width, height }: { width: number; height: number }) => (
  <NextImage alt="logo" src="/images/protocols/autonolas.png" width={width} height={height} />
)
