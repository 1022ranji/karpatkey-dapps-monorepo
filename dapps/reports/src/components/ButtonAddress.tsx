import ArrowUpWhite from '@karpatkey-monorepo/shared/components/Icons/ArrowUpWhite'
import ArrowUpBlack from '@karpatkey-monorepo/shared/components/Icons/ArrowUpBlack'
import Safe from '@karpatkey-monorepo/shared/components/Icons/Safe'
import { CHAINS, CHAIN, DAO_ADDRESS } from '@karpatkey-monorepo/shared/config/constants'
import { shortenAddress } from '@karpatkey-monorepo/shared/utils'
import Button from '@mui/material/Button'
import * as React from 'react'

interface ButtonAddressProp {
  daoAddress: DAO_ADDRESS
}

interface SafeButtonProps {
  address: string
  chain: CHAIN
  onClick: () => void
}

const SafeButton = (props: SafeButtonProps) => {
  const { address, chain, onClick } = props
  return (
    <Button
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        height: '48px',
        padding: '6px 14px',
        color: '#EEEDED',
        background: '#1A1A1A',
        borderRadius: '40px',
        '&:hover': {
          background: '#222222'
        }
      }}
    >
      <Safe />
      {chain?.short}:{shortenAddress(address)}
      <ArrowUpWhite />
    </Button>
  )
}

interface CommonButtonProps {
  address: string
  onClick: () => void
}

const CommonButton = (props: CommonButtonProps) => {
  const { address, onClick } = props
  return (
    <Button
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        height: '48px',
        padding: '6px 14px',
        color: '#1A1A1A',
        background: '#EEEDED',
        borderRadius: '40px',
        border: '1px solid #222222',
        '&:hover': {
          background: '#FFFFFF'
        }
      }}
    >
      {shortenAddress(address)}
      <ArrowUpBlack />
    </Button>
  )
}

const ButtonAddress = (props: ButtonAddressProp) => {
  const { daoAddress } = props
  const { address, chainId, isSafe } = daoAddress

  const chain: CHAIN | undefined = CHAINS.find((chain) => chain.id === chainId)
  if (!chain) return null

  const value = `${chain?.explorer}/${address}`

  const onClick = () => {
    window.open(value, '_blank')
  }

  return (
    <>
      {isSafe ? (
        <SafeButton address={address} chain={chain} onClick={onClick} />
      ) : (
        <CommonButton address={address} onClick={onClick} />
      )}
    </>
  )
}

export default ButtonAddress
