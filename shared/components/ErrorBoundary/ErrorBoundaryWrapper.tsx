import { ComponentProps, ReactElement } from 'react'

import ErrorBoundary from './ErrorBoundary'

const ErrorBoundaryWrapper = (props: ComponentProps<any>): ReactElement => {
  const handleError = () => {
    // do something
  }

  return <ErrorBoundary handleError={handleError} {...props} />
}

export default ErrorBoundaryWrapper
