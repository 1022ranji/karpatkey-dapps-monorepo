import NextImage from 'next/image'
import React from 'react'

const Aura = ({ width, height }: { width: number; height: number }) => (
  <NextImage alt="logo" src="/images/protocols/aura.png" width={width} height={height} />
)

export default Aura
