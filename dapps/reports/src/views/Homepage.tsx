import ContainerWrapper from '@monorepo/shared/components/ContainerWrapper'
import CustomTypography from '@monorepo/shared/components/CustomTypography'
import ErrorBoundaryWrapper from '@monorepo/shared/components/ErrorBoundary/ErrorBoundaryWrapper'
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
