import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import React from 'react'
import { useScreenSize } from '@karpatkey-monorepo/reports/src/hooks/useScreenSize'

interface ValueProps {
  value: string
  fontWeight?: number
  fontSize?: string
}

export const Value = (props: ValueProps) => {
  const screenSize = useScreenSize()
  const isMobile = screenSize.width < 400

  const { value, fontWeight = 400, fontSize = isMobile ? '16px' : '18px' } = props

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
