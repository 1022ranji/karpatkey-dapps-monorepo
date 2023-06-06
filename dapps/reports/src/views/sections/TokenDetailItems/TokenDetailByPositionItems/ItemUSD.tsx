import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import * as React from 'react'

interface ItemUSDProps {
  itemUsd: string
}

const ItemUSD = ({ itemUsd }: ItemUSDProps) => {
  return (
    <CustomTypography
      sx={{
        fontFamily: 'IBM Plex Mono',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '11px',
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

export default ItemUSD