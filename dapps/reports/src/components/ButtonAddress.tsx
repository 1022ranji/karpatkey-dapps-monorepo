import ArrowUpWhite from '@karpatkey-monorepo/shared/components/Icons/ArrowUpWhite'
import Safe from '@karpatkey-monorepo/shared/components/Icons/Safe'
import { CHAINS, DAO_ADDRESS } from '@karpatkey-monorepo/shared/config/constants'
import { shortenAddress } from '@karpatkey-monorepo/shared/utils'
import Button from '@mui/material/Button'
import * as React from 'react'

interface ButtonAddressProp {
  daoAddress: DAO_ADDRESS
}

const ButtonAddress = (props: ButtonAddressProp) => {
  const { daoAddress } = props
  const { address, chainId } = daoAddress

  const value = React.useMemo(() => {
    const chain = CHAINS.find((chain) => chain.id === chainId)
    return `${chain?.explorer}/${address}`
  }, [address, chainId])
  const onClick = () => {
    window.open(value, '_blank')
  }

  return (
    <Button onClick={onClick} sx={{ gap: 2, height: '48px', padding: '6px 14px' }}>
      <Safe />
      {shortenAddress(address)}
      <ArrowUpWhite />
    </Button>
  )
}

export default ButtonAddress
