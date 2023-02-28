import ContainerWrapper from '@/src/components/ContainerWrapper'
import CustomTypography from '@/src/components/CustomTypography'
import ErrorBoundaryWrapper from '@/src/components/ErrorBoundary/ErrorBoundaryWrapper'
import TextLink from '@/src/components/TextLink'
import SendIcon from '@mui/icons-material/Send'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import React from 'react'

interface IData {
  status: boolean
  trx?: Maybe<string>
  error?: Maybe<Error>
}

export default function Panel() {
  const [data, setData] = React.useState<Maybe<IData>>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Maybe<Error>>(null)

  const onClick = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/trigger`)
      if (!response.ok) {
        throw new Error(`This is an HTTP error: The status is ${response.status}`)
      }
      const { data } = await response.json()
      if (!data.status) {
        throw new Error(data.error.message)
      }

      setData(data)
      setError(null)
    } catch (err) {
      setError(err as Error)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ErrorBoundaryWrapper>
      <ContainerWrapper>
        <Button
          onClick={onClick}
          variant="contained"
          endIcon={<SendIcon />}
          disabled={loading}
          sx={{ mb: '10px' }}
        >
          Execute python script
        </Button>
        {error && <Alert severity="error">{error.message}</Alert>}
        {data && data.status && (
          <Alert severity="success">
            <CustomTypography color="textSecondary" variant="body1">
              Successful transaction. You can check it{' '}
              <TextLink href={data.trx || ''} target="_blank">
                here
              </TextLink>
            </CustomTypography>
          </Alert>
        )}
      </ContainerWrapper>
    </ErrorBoundaryWrapper>
  )
}
