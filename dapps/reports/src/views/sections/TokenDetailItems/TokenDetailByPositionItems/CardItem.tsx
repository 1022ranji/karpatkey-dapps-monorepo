import ItemText from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/ItemText'
import ListItems from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/ListItems'
import Position from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/Position'
import ProtocolIcon from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/ProtocolIcon'
import Title from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/Title'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import numbro from 'numbro'
import * as React from 'react'

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
      }
    }
  }
}

const CardItem = (props: CardItemProps) => {
  const { blockchain, protocol, position, data } = props

  const totalUSDValue = Object.keys(data).reduce((acc: any, cur: any) => {
    const tokens = data[cur]
    const total = Object.keys(tokens).reduce((acc: any, cur: any) => {
      const tokenData = tokens[cur]
      return acc + tokenData.usdValue
    }, 0)
    return acc + total
  }, 0)

  const totalUSDValueWithFormat = numbro(totalUSDValue).formatCurrency({
    spaceSeparated: false,
    thousandSeparated: true,
    mantissa: 0
  })

  return (
    <BoxWrapperColumn
      sx={{
        minWidth: '340px',
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
        <ItemText itemText={totalUSDValueWithFormat} />
      </BoxWrapperColumn>
      {Object.keys(data)
        .sort((a: string, b: string) => a.localeCompare(b))
        .map((title: string, index: number) => {
          const tokens = data[title as any]
          return <ListItems key={index} title={title} tokens={tokens} />
        })}
    </BoxWrapperColumn>
  )
}

export default CardItem
