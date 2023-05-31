import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import ErrorBoundaryWrapper from '@karpatkey-monorepo/shared/components/ErrorBoundary/ErrorBoundaryWrapper'
import React, { FC } from 'react'
import ContainerWrapper from 'shared/components/Wrappers/ContainerWrapper'

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
