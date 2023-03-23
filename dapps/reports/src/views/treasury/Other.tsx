import ContainerWrapper from '@karpatkey-monorepo/shared/components/ContainerWrapper'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import ErrorBoundaryWrapper from '@karpatkey-monorepo/shared/components/ErrorBoundary/ErrorBoundaryWrapper'
import React, { FC } from 'react'

const OtherContent: FC = () => {
  return (
    <ErrorBoundaryWrapper>
      <ContainerWrapper>
        <CustomTypography color="textSecondary" variant="h4" textAlign="center">
          Other
        </CustomTypography>
      </ContainerWrapper>
    </ErrorBoundaryWrapper>
  )
}

export default OtherContent
