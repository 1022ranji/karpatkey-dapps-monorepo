import SendIcon from '@mui/icons-material/Send'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import React from 'react'

interface IData {
  message: string
}

export default function Panel() {
  const [data, setData] = React.useState<Maybe<IData>>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Maybe<Error>>(null)

  const callAPI = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/trigger`)
      if (!response.ok) {
        throw new Error(`This is an HTTP error: The status is ${response.status}`)
      }
      const actualData = await response.json()
      setData(actualData)
      setError(null)
    } catch (err) {
      setError(err as Error)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Button
          onClick={callAPI}
          variant="contained"
          endIcon={<SendIcon />}
          disabled={loading}
          sx={{ mb: '10px' }}
        >
          Execute
        </Button>
        {error && <Alert severity="error">{error.message}</Alert>}
        {data && <Alert severity="success">{data?.message}</Alert>}
      </Box>
    </Container>
  )
}
