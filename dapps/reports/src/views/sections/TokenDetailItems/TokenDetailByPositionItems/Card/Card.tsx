import { formatCurrency } from '@karpatkey-monorepo/reports/src/utils/format'
import ItemText from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/Card/ItemText'
import Position from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/Card/Position'
import ProtocolIcon from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/Card/ProtocolIcon'
import Title from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/Card/Title'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import * as React from 'react'

import Common from './Common'
import Ratios from './Ratios'

interface CardItemProps {
  id: number
  card: any
}

const Card = (props: CardItemProps) => {
  const { card } = props
  const { blockchain, protocol, position, totalUSDValue, isMetricCard, values } = card

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
        <ItemText maxWidth={'fit-content'} itemText={formatCurrency(totalUSDValue, 2)} />
      </BoxWrapperColumn>
      {!isMetricCard &&
        Object.keys(values)
          .sort((a, b) => a.localeCompare(b))
          .map((title: any, index: number) => {
            return <Common key={index} title={title} values={values[title]} />
          })}
      {isMetricCard &&
        Object.keys(values)
          .sort((a, b) => a.localeCompare(b))
          .map((title: any, index: number) => {
            return <Ratios key={index} title={title} values={values[title]} />
          })}
    </BoxWrapperColumn>
  )
}

export default Card
