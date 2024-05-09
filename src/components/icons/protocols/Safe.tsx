import React from 'react'
import NextImage from 'next/image'

export const Safe = ({ width, height }: { width: number; height: number }) => (
  <NextImage alt="logo" src="/images/protocols/safe.svg" width={width} height={height} />
)
