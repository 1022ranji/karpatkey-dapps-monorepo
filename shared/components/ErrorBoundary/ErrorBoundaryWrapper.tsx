import ErrorBoundary from '@karpatkey-monorepo/shared/components/ErrorBoundary/ErrorBoundary'
import { ComponentProps, ReactElement } from 'react'

const ErrorBoundaryWrapper = (props: ComponentProps<any>): ReactElement => {
  const handleError = () => {
    // do something
    console.log('TODO: error happened, use a log here')
  }

  return <ErrorBoundary handleError={handleError} {...props} />
}

export default ErrorBoundaryWrapper
