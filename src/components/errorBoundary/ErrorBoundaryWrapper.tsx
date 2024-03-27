import { ComponentProps, ReactElement } from 'react'
import { ErrorBoundary } from 'src/components'

export const ErrorBoundaryWrapper = (props: ComponentProps<any>): ReactElement => {
  const handleError = () => {
    // do something
    console.log('TODO: error happened, use a log here')
  }

  return <ErrorBoundary handleError={handleError} {...props} />
}
