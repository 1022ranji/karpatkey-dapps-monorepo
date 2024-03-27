import React from 'react'
import { BoxWrapperColumn, CustomTypography } from 'src/components'

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
          fontSize: '16px',
          lineHeight: '24px',
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
          lineHeight: '24px',
          fontWeight: '400',
          fontStyle: 'normal'
        }}
      >
        {amount}
      </CustomTypography>
    </BoxWrapperColumn>
  )
}
