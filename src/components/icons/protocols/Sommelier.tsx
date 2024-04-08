import React from 'react'
import NextImage from 'next/image'

export const Sommelier = ({ width, height }: { width: number; height: number }) => (
  <NextImage alt="logo" src="/images/protocols/sommelier.png" width={width} height={height} />
)
