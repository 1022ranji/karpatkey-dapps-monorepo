import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import React from 'react'

interface NumberBlockProps {
  amount: string
  title: string
}

export const NumberBlockCard = ({ amount, title }: NumberBlockProps) => {
  return (
    <BoxWrapperColumn sx={{ alignItems: 'flex-start' }} gap={'10px'}>
      <CustomTypography
        sx={{
          textAlign: 'flex-start',
          fontFamily: 'IBM Plex Mono',
          fontSize: '18px',
          lineHeight: '20px',
          fontWeight: '600',
          fontStyle: 'normal'
        }}
      >
        {title}
      </CustomTypography>
      <CustomTypography
        sx={{
          textAlign: 'flex-start',
          fontFamily: 'IBM Plex Mono',
          fontSize: '18px',
          lineHeight: '20px',
          fontWeight: '400',
          fontStyle: 'normal'
        }}
      >
        {amount}
      </CustomTypography>
    </BoxWrapperColumn>
  )
}
