import CardItem from '@karpatkey-monorepo/reports/src/views/sections/TokenDetailItems/TokenDetailByPositionItems/CardItem'
import { Box } from '@mui/material'
import * as React from 'react'

interface CardListProps {
  tokenDetailByPosition: any[]
}

const CardList = (props: CardListProps) => {
  const { tokenDetailByPosition } = props

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto',
        gridAutoRows: 'minMax(440px, auto)',
        alignItems: 'stretch',
        gap: '10px 10px'
      }}
    >
      {Object.keys(tokenDetailByPosition).map((blockchain: string) => {
        const protocols = Object.keys(tokenDetailByPosition[blockchain as any])
        return protocols.map((protocol: string) => {
          const positions = Object.keys(tokenDetailByPosition[blockchain as any][protocol])
          return positions.map((position: string, index: number) => {
            const data = tokenDetailByPosition[blockchain as any][protocol][position]
            return (
              <CardItem
                key={index}
                blockchain={blockchain}
                protocol={protocol}
                position={position}
                data={data}
              />
            )
          })
        })
      })}
    </Box>
  )
}

export default CardList
