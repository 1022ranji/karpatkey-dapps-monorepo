import NextImage from 'next/image'
import React from 'react'

const Azuro = ({ width, height }: { width: number; height: number }) => (
  <NextImage alt="logo" src="/images/protocols/azuro.png" width={width} height={height} />
)

export default Azuro
