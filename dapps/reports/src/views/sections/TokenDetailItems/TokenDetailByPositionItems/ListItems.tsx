import ItemText from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/ItemText'
import ItemUSD from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/ItemUSD'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { Box, Divider } from '@mui/material'
import numbro from 'numbro'
import * as React from 'react'

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
      <ItemText itemText={title} />
      <Divider />
      {Object.keys(tokens).map((token: string, index: number) => {
        const tokenData = tokens[token]
        const usdValue = numbro(tokenData.usdValue).formatCurrency({
          spaceSeparated: false,
          thousandSeparated: true,
          mantissa: 0
        })

        return (
          <Box key={index}>
            <BoxWrapperColumn>
              <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
                <ItemText itemText={token} />
                <ItemText itemText={tokenData.tokenBalance.toFixed(2)} />
              </BoxWrapperRow>
              <ItemUSD itemUsd={usdValue} />
            </BoxWrapperColumn>
            <Divider />
          </Box>
        )
      })}
    </BoxWrapperColumn>
  )
}

export default ListItems
