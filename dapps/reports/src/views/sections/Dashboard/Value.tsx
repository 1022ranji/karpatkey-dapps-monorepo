import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import React from 'react'

interface ValueProps {
  value: string
  fontWeight?: number
  fontSize?: string
}

export const Value = (props: ValueProps) => {
  const { value, fontWeight = 400, fontSize = '18px' } = props

  return (
    <CustomTypography
      sx={{
        fontFamily: 'IBM Plex Mono',
        fontStyle: 'normal',
        fontWeight,
        fontSize,
        lineHeight: '24px',
        color: '#1A1A1A',
        whiteSpace: 'pre-line'
      }}
    >
      {value}
    </CustomTypography>
  )
}
