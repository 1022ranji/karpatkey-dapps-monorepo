import ItemText from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/Card/ItemText'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { Divider } from '@mui/material'
import * as React from 'react'

import { formatCurrency, formatNumber, formatPercentage } from '../../../../../utils/format'

interface MetricBodyProps {
  metrics: {
    [key: string]: {
      tokenBalance: number
      usdValue: number
      metricValue: number
    }
  }
}

const MetricBody = ({ metrics }: MetricBodyProps) => {
  return (
    <BoxWrapperColumn sx={{ gap: 1 }}>
      <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
        <ItemText itemText="Collateral" />
        <ItemText itemText={formatNumber(metrics['Collateral'].metricValue)} maxWidth={'140px'} />
      </BoxWrapperRow>
      <Divider />
      <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
        <ItemText itemText="Debt" />
        <ItemText itemText={formatNumber(metrics['Debt'].metricValue)} maxWidth={'140px'} />
      </BoxWrapperRow>
      <Divider />
      <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
        <ItemText itemText={'Collateral ratio'} />
        <ItemText
          itemText={formatPercentage(metrics['Collateral Ratio'].metricValue, 0)}
          maxWidth={'140px'}
        />
      </BoxWrapperRow>
      <Divider />
      <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
        <ItemText itemText={'Minimun collateral ratio'} />
        <ItemText
          itemText={formatPercentage(metrics['Minimum Collateral Ratio'].metricValue / 100)}
          maxWidth={'140px'}
        />
      </BoxWrapperRow>
      <Divider />
      <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
        <ItemText itemText={'Liquidation price'} />
        <ItemText
          itemText={formatCurrency(metrics['Liquidation Price'].metricValue, 0)}
          maxWidth={'140px'}
        />
      </BoxWrapperRow>
      <Divider />
      <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
        <ItemText itemText={'Price drop to liquidation'} />
        <ItemText
          itemText={formatPercentage(metrics['Price to drop liquidation'].metricValue)}
          maxWidth={'140px'}
        />
      </BoxWrapperRow>
      <Divider />
    </BoxWrapperColumn>
  )
}

export default MetricBody
