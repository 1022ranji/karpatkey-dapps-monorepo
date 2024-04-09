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
            fontSize: '32px',
            lineHeight: '20px',
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
            fontSize: '20px',
            lineHeight: '22px',
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
