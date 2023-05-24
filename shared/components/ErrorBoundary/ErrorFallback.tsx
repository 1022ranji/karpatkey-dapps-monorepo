import ContainerWrapper from '@karpatkey-monorepo/shared/components/ContainerWrapper'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import Paper from '@karpatkey-monorepo/shared/components/Paper'
import ErrorIcon from '@mui/icons-material/Error'
import { Box, styled } from '@mui/material'
import React, { FC } from 'react'
import { FallbackProps } from 'react-error-boundary'

const GENERIC_ERROR_MESSAGE = 'Oops! Something went wrong'
const DESCRIPTION_ERROR_MESSAGE = 'This issue has been addressed to the team.'
const REFRESH_ERROR_MESSAGE = 'You may also refresh the page or try again later.'

const StyledPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '32px',
  padding: '32px'
})

const ErrorFallback: FC<FallbackProps> = () => {
  return (
    <ContainerWrapper sx={{ padding: '32px 16px', display: 'flex', justifyContent: 'center' }}>
      <Box height="100%" display="flex" position="relative" alignItems="center">
        <StyledPaper>
          <ErrorIcon color="primary" sx={{ width: 60, height: 60 }} />
          <CustomTypography fontSize={40} fontWeight="extra-bold" textAlign="center">
            {GENERIC_ERROR_MESSAGE}
          </CustomTypography>
          <CustomTypography variant="h4" textAlign="center">
            {DESCRIPTION_ERROR_MESSAGE}
          </CustomTypography>
          <CustomTypography variant="h4" textAlign="center">
            {REFRESH_ERROR_MESSAGE}
          </CustomTypography>
        </StyledPaper>
      </Box>
    </ContainerWrapper>
  )
}

export default ErrorFallback
