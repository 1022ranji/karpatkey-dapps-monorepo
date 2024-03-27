import React, { ComponentProps, ErrorInfo, FC } from 'react'
import { ErrorBoundary as ErrorBoundaryComponent } from 'react-error-boundary'
import { ErrorFallback } from 'src/components'

interface ErrorBoundaryWrapperProps extends ComponentProps<any> {
  handleError: (error: Error, info: ErrorInfo) => void
}

export const ErrorBoundary: FC<ErrorBoundaryWrapperProps> = ({ handleError, children }) => (
  <ErrorBoundaryComponent FallbackComponent={ErrorFallback} onError={handleError}>
    {children}
  </ErrorBoundaryComponent>
)
