import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import React from 'react'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import { useScreenSize } from '@karpatkey-monorepo/reports/src/hooks/useScreenSize'

interface NumberBlockProps {
  amount: string
  title: string
}

export const NumberBlock = ({ amount, title }: NumberBlockProps) => {
  const screenSize = useScreenSize()
  const isMobile = screenSize.width < 400

  return (
    <AnimatePresenceWrapper>
      <BoxWrapperColumn sx={{ justifyContent: 'center' }} gap={'10px'}>
        <CustomTypography
          textAlign="center"
          variant="h2"
          sx={{
            fontFamily: 'IBM Plex Mono',
            fontSize: isMobile ? '26px' : '36px',
            lineHeight: isMobile ? '22px' : '24px',
            fontStyle: 'normal',
            fontWeight: 600
          }}
        >
          {amount}
        </CustomTypography>
        <CustomTypography
          textAlign="center"
          sx={{
            fontFamily: 'IBM Plex Mono',
            fontSize: isMobile ? '20px' : '22px',
            lineHeight: isMobile ? '22px' : '24px',
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
