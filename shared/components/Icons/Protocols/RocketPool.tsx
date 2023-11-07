import React from 'react'
import NextImage from 'next/image'

const RocketPool = ({ width, height }: { width: number; height: number }) => (
  <NextImage alt="logo" src="/images/protocols/rocketpool.png" width={width} height={height} />
)

export default RocketPool
