import { formatCurrency, formatNumber } from '../../../../../../utils/format'
import { BoxWrapperColumn, BoxWrapperRow } from 'components/index'
import { Divider } from '@mui/material'
import * as React from 'react'

import { ItemText } from './ItemText'
import { ItemUSD } from './ItemUSD'
import { useApp } from '../../../../../../contexts/app.context'

interface ListItemsProps {
  title: string
  tokens: Maybe<
    [
      {
        symbol: string
        balance?: number
        usdValue?: number
      }
    ]
  >
}

export const Common = ({ title, tokens }: ListItemsProps) => {
  const { state } = useApp()
  const { currency } = state

  return (
    <BoxWrapperColumn sx={{ gap: 2 }}>
      <BoxWrapperColumn gap={1}>
        <ItemText itemText={title} maxWidth={'fit-content'} />
        <Divider sx={{ borderBottomWidth: 5 }} />
      </BoxWrapperColumn>
      {tokens
        ?.sort(
          (a: { usdValue?: number }, b: { usdValue?: number }) =>
            (b?.usdValue ?? 0) - (a?.usdValue ?? 0)
        )
        .map((token: { symbol: string; balance?: number; usdValue?: number }, index: number) => {
          const { symbol, usdValue, balance } = token
          const formatUsdValue = usdValue
            ? currency === 'USD'
              ? formatCurrency(usdValue, 2)
              : `${formatNumber(usdValue, 2)} ETH`
            : ''
          const formatBalance = balance ? formatNumber(balance) : ''
          return (
            <BoxWrapperColumn key={index} gap={1}>
              <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
                <ItemText itemText={symbol} />
                <ItemText itemText={formatBalance} />
              </BoxWrapperRow>
              <ItemUSD itemUsd={formatUsdValue} />
              <Divider />
            </BoxWrapperColumn>
          )
        })}
    </BoxWrapperColumn>
  )
}
