import { formatCurrency } from '@karpatkey-monorepo/reports/src/utils/format'
import ItemText from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/Card/ItemText'
import ListItems from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/Card/ListItems'
import Position from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/Card/Position'
import ProtocolIcon from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/Card/ProtocolIcon'
import Title from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/Card/Title'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import * as React from 'react'

import MetricBody from './MetricBody'

interface CardItemProps {
  id: number
  blockchain: string
  protocol: string
  position: string
  data: {
    [key: string]: {
      [key: string]: {
        tokenBalance: number
        usdValue: number
        metricValue: number
      }
    }
  }
}

const Card = (props: CardItemProps) => {
  const { blockchain, protocol, position, data } = props

  const totalUSDValue = Object.keys(data).reduce((acc: any, cur: any) => {
    const tokens = data[cur]
    const total = Object.keys(tokens).reduce((acc: any, cur: any) => {
      const tokenData = tokens[cur]
      return acc + tokenData.usdValue
    }, 0)
    return acc + total
  }, 0)

  const isMetricsCard = Object.keys(data).includes('Metrics')

  return (
    <BoxWrapperColumn
      sx={{
        maxWidth: '340px',
        minHeight: '450px',
        height: 'content-fit',
        padding: '8px 8px',
        border: '1px solid #B6B6B6',
        background: 'background.paper'
      }}
      gap={4}
    >
      <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
        <Title title={blockchain} />
        <BoxWrapperRow gap={1}>
          <ProtocolIcon protocol={protocol} />
          <Title title={protocol} />
        </BoxWrapperRow>
      </BoxWrapperRow>
      <BoxWrapperColumn gap={1}>
        <Position position={position} />
        {!isMetricsCard ? <ItemText itemText={formatCurrency(totalUSDValue, 2)} /> : null}
      </BoxWrapperColumn>
      {!isMetricsCard
        ? Object.keys(data)
            .sort((a: string, b: string) => a.localeCompare(b))
            .map((title: string, index: number) => {
              const tokens = data[title as any]
              return <ListItems key={index} title={title} tokens={tokens} />
            })
        : null}
      {isMetricsCard
        ? Object.keys(data)
            .filter((title: string) => title === 'Metrics')
            .map((title: string, index: number) => {
              const metrics = data[title as any]
              return <MetricBody key={index} metrics={metrics} />
            })
        : null}
    </BoxWrapperColumn>
  )
}

export default Card
