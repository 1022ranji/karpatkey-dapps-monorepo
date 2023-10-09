import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import React from 'react'

export const Title = ({ title }: { title: string }) => {
  return (
    <CustomTypography
      textAlign="center"
      sx={{
        fontFamily: 'IBM Plex Mono',
        fontSize: '24px',
        lineHeight: '28px',
        fontWeight: '300',
        fontStyle: 'normal',
        color: '#1A1A1A'
      }}
    >
      {title}
    </CustomTypography>
  )
}
