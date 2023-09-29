import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import React from 'react'

interface NumberBlockProps {
  amount: string
  title: string
}

export const NumberBlock = ({ amount, title }: NumberBlockProps) => {
  return (
    <BoxWrapperColumn sx={{ justifyContent: 'center' }} gap={2}>
      <CustomTypography variant="h2" textAlign="center">
        {amount}
      </CustomTypography>
      <CustomTypography
        textAlign="center"
        sx={{
          fontFamily: 'IBM Plex Mono',
          fontSize: '24px',
          lineHeight: '28px',
          fontWeight: '300',
          fontStyle: 'normal'
        }}
      >
        {title}
      </CustomTypography>
    </BoxWrapperColumn>
  )
}
