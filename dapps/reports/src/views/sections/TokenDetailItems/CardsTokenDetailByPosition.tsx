import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import * as React from 'react'

interface CardsTokenDetailByPositionProps {
  tokenDetailByPosition: any[]
}

const CardsTokenDetailByPosition = (props: CardsTokenDetailByPositionProps) => {
  const { tokenDetailByPosition } = props
  return (
    <BoxWrapperColumn gap={4}>
      {Object.keys(tokenDetailByPosition).map((key: string, index: number) => {
        return `${key} - ${index}`
      })}
    </BoxWrapperColumn>
  )
}

export default CardsTokenDetailByPosition
