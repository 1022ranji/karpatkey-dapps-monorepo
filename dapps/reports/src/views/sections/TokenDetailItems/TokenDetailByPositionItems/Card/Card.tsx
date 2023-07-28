import { formatCurrency } from '@karpatkey-monorepo/reports/src/utils/format'
import ItemText from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/Card/ItemText'
import Position from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/Card/Position'
import ProtocolIcon from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/Card/ProtocolIcon'
import Title from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/Card/Title'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import * as React from 'react'
import UniswapHelpText from '@karpatkey-monorepo/shared/components/UniswapHelpText'

import Common from './Common'
import Ratios from './Ratios'

interface CardItemProps {
  id: number
  card: any
}

const Card = (props: CardItemProps) => {
  const { card } = props
  const { blockchain, protocol, position, totalUsdValue, cardType, categories } = card

  const helpText = <UniswapHelpText />

  return (
    <BoxWrapperColumn gap={4}>
      <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
        <Title title={blockchain} />
        <BoxWrapperRow gap={1}>
          <ProtocolIcon protocol={protocol} />
          <Title title={protocol} />
        </BoxWrapperRow>
      </BoxWrapperRow>
      <BoxWrapperColumn gap={1}>
        <Position position={position} {...(protocol === 'UniswapV3' ? { helpText } : {})} />
        <ItemText maxWidth={'fit-content'} itemText={formatCurrency(totalUsdValue || 0, 2)} />
      </BoxWrapperColumn>
      {cardType === 'common' &&
        categories
          .sort((a: any, b: any) => a.name.localeCompare(b.name))
          .map((category: any, index: number) => {
            const { name, tokens } = category
            if (tokens && tokens.length > 0) {
              return <Common key={index} title={name} tokens={tokens} />
            } else {
              return null
            }
          })}
      {cardType === 'metrics' &&
        categories
          .sort((a: any, b: any) => a.name.localeCompare(b.name))
          .map((category: any, index: number) => {
            const { name, tokens, ratios } = category
            if (name === 'Ratios') {
              if (ratios && ratios.length > 0) {
                return <Ratios key={index} title={name} ratios={ratios} />
              } else {
                return null
              }
            } else {
              if (tokens && tokens.length > 0) {
                return <Common key={index} title={name} tokens={tokens} />
              } else {
                return null
              }
            }
          })}
    </BoxWrapperColumn>
  )
}

export default Card
