import React from 'react'
import { AnimatePresenceWrapper, CustomTypography, BoxWrapperColumn } from 'src/components'

interface NumberBlockProps {
  amount: string
  title: string
}

export const NumberBlock = ({ amount, title }: NumberBlockProps) => {
  return (
    <AnimatePresenceWrapper>
      <BoxWrapperColumn sx={{ justifyContent: 'center' }} gap={'20px'}>
        <CustomTypography
          textAlign="center"
          variant="h2"
          sx={{
            fontFamily: 'IBM Plex Mono',
            fontSize: '36px',
            lineHeight: '24px',
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
            fontSize: '22px',
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
