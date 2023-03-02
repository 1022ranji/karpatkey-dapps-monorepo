import ResetCache from '@/src/components/ButtonActions/ResetCache'
import TriggerAction from '@/src/components/ButtonActions/TriggerAction'
import ContainerWrapper from '@/src/components/ContainerWrapper'
import ErrorBoundaryWrapper from '@/src/components/ErrorBoundary/ErrorBoundaryWrapper'
import React from 'react'

export default function Panel() {
  return (
    <ErrorBoundaryWrapper>
      <ContainerWrapper>
        <ResetCache />
        <TriggerAction />
      </ContainerWrapper>
    </ErrorBoundaryWrapper>
  )
}
