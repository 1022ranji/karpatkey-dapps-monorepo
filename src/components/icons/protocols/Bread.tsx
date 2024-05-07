import React from 'react'
import NextImage from 'next/image'

export const Bread = ({ width, height }: { width: number; height: number }) => (
  <NextImage alt="logo" src="/images/protocols/bread.svg" width={width} height={height} />
)
