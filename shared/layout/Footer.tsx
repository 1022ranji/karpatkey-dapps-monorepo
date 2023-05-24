import BoxWrapperRow from '@karpatkey-monorepo/shared/components/BoxWrapperRow'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { TITLE } from '@karpatkey-monorepo/shared/config/constants'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { FC, ReactElement } from 'react'

const FooterWrapper = styled(Box)(({ theme }: any) => ({
  backgroundColor: theme.palette.background.default
}))

const Footer: FC = (): ReactElement => {
  return (
    <FooterWrapper>
      <BoxWrapperRow>
        <CustomTypography color="textSecondary" variant="subtitle1">
          {`${new Date().getFullYear()}`} © {TITLE}
        </CustomTypography>
      </BoxWrapperRow>
    </FooterWrapper>
  )
}

export default Footer
