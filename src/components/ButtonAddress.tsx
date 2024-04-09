import Button from '@mui/material/Button'
import * as React from 'react'
import { ArrowUpWhite, ArrowUpBlack, Safe } from 'src/components'
import { CHAINS, CHAIN, DAO_ADDRESS } from 'src/config/constants'
import { shortenAddress } from 'src/utils'

interface ButtonAddressProp {
  daoAddress: DAO_ADDRESS
  key: number
  sx?: any
}

interface SafeButtonProps {
  address: string
  chain: CHAIN
  onClick: () => void
  key: number
  sx?: any
}

export const SafeButton = (props: SafeButtonProps) => {
  const { address, chain, onClick, key, sx = {} } = props
  return (
    <Button
      key={key}
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: '8px', md: '16px' },
        height: {
          xs: '40px',
          md: '48px'
        },
        padding: {
          xs: '4px 7px',
          md: '6px 14px'
        },
        color: '#EEEDED',
        background: '#1A1A1A',
        borderRadius: '40px',
        minWidth: {
          xs: '120px',
          md: '200px'
        },
        '&:hover': {
          background: '#222222'
        },
        fontSize: {
          xs: '12px',
          md: '16px'
        },
        lineHeight: {
          xs: '16px',
          md: '24px'
        },
        ...sx
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
  sx?: any
  key: number
}

const CommonButton = (props: CommonButtonProps) => {
  const { address, key, onClick, sx = {} } = props
  return (
    <Button
      onClick={onClick}
      key={key}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: '8px', md: '16px' },
        height: {
          xs: '40px',
          md: '48px'
        },
        padding: {
          xs: '4px 7px',
          md: '6px 14px'
        },
        color: '#1A1A1A',
        background: '#EEEDED',
        borderRadius: '40px',
        border: '1px solid #222222',
        minWidth: {
          xs: '120px',
          md: '200px'
        },
        '&:hover': {
          background: '#FFFFFF'
        },
        fontSize: {
          xs: '12px',
          md: '16px'
        },
        lineHeight: {
          xs: '16px',
          md: '24px'
        },
        ...sx
      }}
    >
      {shortenAddress(address)}
      <ArrowUpBlack />
    </Button>
  )
}

export const ButtonAddress = (props: ButtonAddressProp) => {
  const { daoAddress, key, sx } = props
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
        <SafeButton address={address} chain={chain} onClick={onClick} key={key} {...sx} />
      ) : (
        <CommonButton address={address} onClick={onClick} key={key} {...sx} />
      )}
    </>
  )
}
