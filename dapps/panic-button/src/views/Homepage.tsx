import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import ErrorBoundaryWrapper from '@karpatkey-monorepo/shared/components/ErrorBoundary/ErrorBoundaryWrapper'
import ContainerWrapper from '@karpatkey-monorepo/shared/components/Wrappers/ContainerWrapper'
import React, { FC } from 'react'

const HomepageContent: FC = () => {
  return (
    <ErrorBoundaryWrapper>
      <ContainerWrapper>
        <CustomTypography color="textSecondary" variant="h4" textAlign="center">
          Homepage
        </CustomTypography>
      </ContainerWrapper>
    </ErrorBoundaryWrapper>
  )
}

export default HomepageContent
