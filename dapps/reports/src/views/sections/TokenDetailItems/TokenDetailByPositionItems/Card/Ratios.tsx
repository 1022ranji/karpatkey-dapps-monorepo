import {
  formatCurrency,
  formatNumber,
  formatPercentage
} from '@karpatkey-monorepo/reports/src/utils/format'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { Divider } from '@mui/material'
import * as React from 'react'

import ItemText from './ItemText'

interface RatiosProps {
  title: string
  values: {
    [key: string]: {
      metricValue?: number
    }
  }
}

const Ratios = ({ title, values }: RatiosProps) => {
  return (
    <BoxWrapperColumn sx={{ gap: 2 }}>
      <BoxWrapperColumn gap={1}>
        <ItemText itemText={title} />
        <Divider sx={{ borderBottomWidth: 5 }} />
      </BoxWrapperColumn>
      {Object.keys(values)
        .sort((a, b) => a.localeCompare(b))
        .map((item: string, index: number) => {
          const { metricValue } = values[item]
          let value = ''
          if (item === 'Collateral Ratio' || item === 'Price to drop liquidation') {
            value = metricValue ? formatPercentage(metricValue, 0) : ''
          }
          if (item === 'Minimum Collateral Ratio') {
            value = metricValue ? formatPercentage(metricValue / 100, 0) : ''
          }
          if (item === 'Collateral' || item === 'Debt') {
            value = metricValue ? formatNumber(metricValue) : ''
          }
          if (item === 'Liquidation Price') {
            value = metricValue ? formatCurrency(metricValue, 0) : ''
          }
          return (
            <BoxWrapperColumn key={index} gap={1}>
              <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
                <ItemText itemText={item} />
                <ItemText itemText={value} maxWidth={'140px'} />
              </BoxWrapperRow>
              <Divider />
            </BoxWrapperColumn>
          )
        })}
    </BoxWrapperColumn>
  )
}

export default Ratios
