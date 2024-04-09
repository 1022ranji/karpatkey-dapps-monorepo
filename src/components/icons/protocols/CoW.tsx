import React from 'react'
import NextImage from 'next/image'

export const CoW = ({ width, height }: { width: number; height: number }) => (
  <NextImage alt="logo" src="/images/protocols/cow-blue.svg" width={width} height={height} />
)
