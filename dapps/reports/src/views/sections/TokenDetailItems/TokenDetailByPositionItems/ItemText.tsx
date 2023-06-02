import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import * as React from 'react'

interface ItemTextProps {
  itemText: string
}

const ItemText = ({ itemText }: ItemTextProps) => {
  return (
    <CustomTypography
      sx={{
        fontFamily: 'IBM Plex Sans',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '16px',
        lineHeight: '20px',
        color: 'custom.grey.dark'
      }}
    >
      {itemText}
    </CustomTypography>
  )
}

export default ItemText
