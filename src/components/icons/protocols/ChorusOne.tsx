import React from 'react'
import NextImage from 'next/image'

export const ChorusOne = ({ width, height }: { width: number; height: number }) => (
  <NextImage alt="logo" src="/images/protocols/chorus-one.svg" width={width} height={height} />
)
