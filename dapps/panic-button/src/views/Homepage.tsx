import ContainerWrapper from '@/src/components/ContainerWrapper'
import CustomTypography from '@/src/components/CustomTypography'
import ErrorBoundaryWrapper from '@/src/components/ErrorBoundary/ErrorBoundaryWrapper'
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
