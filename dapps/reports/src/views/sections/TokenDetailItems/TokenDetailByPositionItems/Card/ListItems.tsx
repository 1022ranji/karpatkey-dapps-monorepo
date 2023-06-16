import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { Divider } from '@mui/material'
import * as React from 'react'

import { formatCurrency, formatNumber } from '../../../../../utils/format'
import ItemText from './ItemText'
import ItemUSD from './ItemUSD'

interface ListItemsProps {
  title: string
  tokens: {
    [key: string]: {
      tokenBalance: number
      usdValue: number
    }
  }
}

const ListItems = ({ title, tokens }: ListItemsProps) => {
  return (
    <BoxWrapperColumn sx={{ gap: 2 }}>
      <BoxWrapperColumn gap={1}>
        <ItemText itemText={title} />
        <Divider sx={{ borderBottomWidth: 5 }} />
      </BoxWrapperColumn>
      {Object.keys(tokens).map((token: string, index: number) => {
        const tokenData = tokens[token]
        const usdValue = formatCurrency(tokenData.usdValue, 2)
        const tokenBalance = formatNumber(tokenData.tokenBalance)
        return (
          <BoxWrapperColumn key={index} gap={1}>
            <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
              <ItemText itemText={token} />
              <ItemText itemText={tokenBalance} />
            </BoxWrapperRow>
            <ItemUSD itemUsd={usdValue} />
            <Divider />
          </BoxWrapperColumn>
        )
      })}
    </BoxWrapperColumn>
  )
}

export default ListItems