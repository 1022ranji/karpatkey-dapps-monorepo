import React from 'react'
import NextImage from 'next/image'

export const Dolomite = ({ width, height }: { width: number; height: number }) => (
  <NextImage alt="logo" src="/images/protocols/dolomite.svg" width={width} height={height} />
)
