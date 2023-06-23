import { formatCurrency, formatNumber } from '@karpatkey-monorepo/reports/src/utils/format'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { Divider } from '@mui/material'
import * as React from 'react'

import ItemText from './ItemText'
import ItemUSD from './ItemUSD'

interface ListItemsProps {
  title: string
  values: {
    [key: string]: {
      tokenBalance?: number
      usdValue?: number
    }
  }
}

const Common = ({ title, values }: ListItemsProps) => {
  return (
    <BoxWrapperColumn sx={{ gap: 2 }}>
      <BoxWrapperColumn gap={1}>
        <ItemText itemText={title} />
        <Divider sx={{ borderBottomWidth: 5 }} />
      </BoxWrapperColumn>
      {Object.keys(values)
        .sort((a, b) => a.localeCompare(b))
        .map((item: string, index: number) => {
          const { usdValue, tokenBalance } = values[item]
          const value = usdValue ? formatCurrency(usdValue, 2) : ''
          const balance = tokenBalance ? formatNumber(tokenBalance) : ''
          return (
            <BoxWrapperColumn key={index} gap={1}>
              <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
                <ItemText itemText={item} />
                <ItemText itemText={balance} />
              </BoxWrapperRow>
              <ItemUSD itemUsd={value} />
              <Divider />
            </BoxWrapperColumn>
          )
        })}
    </BoxWrapperColumn>
  )
}

export default Common
