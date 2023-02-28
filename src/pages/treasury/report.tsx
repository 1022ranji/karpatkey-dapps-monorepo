import ContainerWrapper from '@/src/components/ContainerWrapper'
import CustomTypography from '@/src/components/CustomTypography'
import ErrorBoundaryWrapper from '@/src/components/ErrorBoundary/ErrorBoundaryWrapper'
import * as React from 'react'

export default function Report() {
  return (
    <ErrorBoundaryWrapper>
      <ContainerWrapper>
        <CustomTypography color="textSecondary" variant="h4" textAlign="center">
          Hello report
        </CustomTypography>
      </ContainerWrapper>
    </ErrorBoundaryWrapper>
  )
}
