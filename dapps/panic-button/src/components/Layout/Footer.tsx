import ContainerWrapper from '@/src/components/ContainerWrapper'
import CustomTypography from '@/src/components/CustomTypography'
import { TITLE } from '@/src/config/constants'
import { Grid } from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { FC, ReactElement } from 'react'

const FooterWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  zIndex: 10,
  padding: 0,
  flex: '0 0 auto'
}))

const Footer: FC = (): ReactElement => {
  return (
    <FooterWrapper>
      <ContainerWrapper>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <CustomTypography color="textSecondary" variant="subtitle1">
              {`${new Date().getFullYear()}`} © {TITLE}
            </CustomTypography>
          </Grid>
        </Grid>
      </ContainerWrapper>
    </FooterWrapper>
  )
}

export default Footer
