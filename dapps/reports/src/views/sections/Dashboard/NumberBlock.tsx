import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import React from 'react'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'

interface NumberBlockProps {
  amount: string
  title: string
}

export const NumberBlock = ({ amount, title }: NumberBlockProps) => {
  return (
    <AnimatePresenceWrapper>
      <BoxWrapperColumn sx={{ justifyContent: 'center' }} gap={'10px'}>
        <CustomTypography variant="h2" textAlign="center" sx={{ fontWeight: 600 }}>
          {amount}
        </CustomTypography>
        <CustomTypography
          textAlign="center"
          sx={{
            fontFamily: 'IBM Plex Mono',
            fontSize: '24px',
            lineHeight: '24px',
            fontWeight: '400',
            fontStyle: 'normal'
          }}
        >
          {title}
        </CustomTypography>
      </BoxWrapperColumn>
    </AnimatePresenceWrapper>
  )
}
