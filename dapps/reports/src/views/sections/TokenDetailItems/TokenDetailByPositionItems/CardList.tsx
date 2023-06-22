import { Box } from '@mui/material'
import * as React from 'react'

import Card from './Card/Card'

interface CardListProps {
  tokenDetailByPosition: any[]
}

const CardList = (props: CardListProps) => {
  const { tokenDetailByPosition } = props

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(240px, auto))',
        gridAutoRows: 'minMax(440px, auto)',
        alignItems: 'stretch',
        gap: '20px 20px'
      }}
    >
      {tokenDetailByPosition.map((card: any, index: number) => {
        return <Card id={index} key={index} card={card} />
      })}
    </Box>
  )
}

export default CardList
