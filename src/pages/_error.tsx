import { NextPageContext } from 'next'
import NextErrorComponent, { ErrorProps } from 'next/error'
import { FC, ReactElement } from 'react'

export interface MyErrorProps {
  statusCode: number
}

const MyError: FC<MyErrorProps> = ({ statusCode }): ReactElement => {
  return <NextErrorComponent statusCode={statusCode} />
}

export const getInitialProps = async (props: NextPageContext): Promise<ErrorProps> => {
  const { err } = props
  const errorInitialProps = await NextErrorComponent.getInitialProps(props)

  if (err) {
    // TODO: add error to the activity log or some other service
    console.log('Error in getInitialProps', err)

    return errorInitialProps
  }

  return errorInitialProps
}

export default MyError
