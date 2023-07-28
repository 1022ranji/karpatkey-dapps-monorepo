import { formatCurrency, formatPercentage } from '@karpatkey-monorepo/reports/src/utils/format'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { Divider } from '@mui/material'
import * as React from 'react'

import ItemText from './ItemText'

interface RatiosProps {
  title: string
  ratios: Maybe<
    [
      {
        name: string
        value?: number
      }
    ]
  >
}

const sortOrder = [
  'Collateral',
  'Debt',
  'Collateral Ratio',
  'Minimum Collateral Ratio',
  'Collateral Liquidation Price',
  'Collateral Price drop to liquidation'
]

const Ratios = ({ title, ratios }: RatiosProps) => {
  return (
    <BoxWrapperColumn sx={{ gap: 2 }}>
      <BoxWrapperColumn gap={1}>
        <ItemText itemText={title} />
        <Divider sx={{ borderBottomWidth: 5 }} />
      </BoxWrapperColumn>
      {ratios
        ?.sort((a, b) => sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name))
        .map(({ name, value }, index: number) => {
          let formatValue = ''
          if (name === 'Collateral Ratio' || name === 'Collateral Price drop to liquidation') {
            formatValue = formatPercentage(value || 0, 0)
          }
          if (name === 'Minimum Collateral Ratio') {
            formatValue = formatPercentage((value || 0) / 100, 0)
          }
          if (name === 'Collateral Liquidation Price') {
            formatValue = formatCurrency(value || 0, 0)
          }
          return (
            <BoxWrapperColumn key={index} gap={1}>
              <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
                <ItemText itemText={name} />
                <ItemText itemText={formatValue} maxWidth={'140px'} />
              </BoxWrapperRow>
              <Divider />
            </BoxWrapperColumn>
          )
          return null
        })}
    </BoxWrapperColumn>
  )
}

export default Ratios
