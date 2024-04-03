import { CustomTypography } from 'components/index'
import * as React from 'react'

interface ItemUSDProps {
  itemUsd: string
}

export const ItemUSD = ({ itemUsd }: ItemUSDProps) => {
  return (
    <CustomTypography
      sx={{
        fontFamily: 'IBM Plex Mono',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '14px',
        color: 'custom.grey.dark',
        letterSpacing: '-0.02em',
        textAlign: 'end'
      }}
    >
      {itemUsd}
    </CustomTypography>
  )
}
