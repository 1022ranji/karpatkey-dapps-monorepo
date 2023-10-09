import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import React from 'react'

export const Value = ({
  value,
  fontWeight = 400,
  fontSize = '18px'
}: {
  value: string
  fontWeight?: number
  fontSize?: string
}) => {
  return (
    <CustomTypography
      sx={{
        fontFamily: 'IBM Plex Mono',
        fontStyle: 'normal',
        fontWeight,
        fontSize,
        lineHeight: '24px',
        color: '#1A1A1A'
      }}
    >
      {value}
    </CustomTypography>
  )
}
