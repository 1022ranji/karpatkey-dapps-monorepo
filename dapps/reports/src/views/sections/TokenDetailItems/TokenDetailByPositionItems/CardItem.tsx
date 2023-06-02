import ListItems from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/ListItems'
import Position from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/Position'
import Title from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/Title'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import * as React from 'react'

interface CardItemProps {
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
  return (
    <BoxWrapperColumn
      sx={{
        minWidth: '340px',
        minHeight: '620px',
        height: 'content-fit',
        padding: '8px 8px',
        border: '1px solid #B6B6B6',
        background: 'background.paper'
      }}
      gap={2}
    >
      <BoxWrapperRow sx={{ justifyContent: 'space-between' }}>
        <Title title={blockchain} />
        <Title title={protocol} />
      </BoxWrapperRow>
      <Position position={position} />
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
