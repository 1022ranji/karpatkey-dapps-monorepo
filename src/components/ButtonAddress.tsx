import Button from '@mui/material/Button'
import * as React from 'react'
import { ArrowUpWhite, ArrowUpBlack, Safe } from 'src/components'
import { CHAINS, CHAIN, DAO_ADDRESS } from 'src/config/constants'
import { shortenAddress } from 'src/utils'

interface ButtonAddressProp {
  daoAddress: DAO_ADDRESS
}

interface SafeButtonProps {
  address: string
  chain: CHAIN
  onClick: () => void
}

export const SafeButton = (props: SafeButtonProps) => {
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

export const ButtonAddress = (props: ButtonAddressProp) => {
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
