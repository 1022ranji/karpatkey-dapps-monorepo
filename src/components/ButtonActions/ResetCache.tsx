import CustomTypography from '@/src/components/CustomTypography'
import ModalDialog from '@/src/components/ModalDialog'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import React from 'react'

interface IData {
  status: boolean
  message?: Maybe<string>
  error?: Maybe<Error>
}

export default function ResetCache() {
  const [data, setData] = React.useState<Maybe<IData>>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Maybe<Error>>(null)

  const [open, setOpen] = React.useState(false)

  const onClick = () => {
    setOpen(true)
  }

  const handleClose = async (status: boolean) => {
    setOpen(false)
    if (status) {
      await handleClickAction()
    }
  }

  const handleClickAction = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/cache`)
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        mb: '10px',
        gap: '10px'
      }}
    >
      <Button
        onClick={onClick}
        variant="contained"
        disabled={loading}
        {...(loading
          ? {
              endIcon: <CircularProgress color="primary" size={20} />
            }
          : {})}
      >
        Reset cache
      </Button>
      <ModalDialog
        open={open}
        title="Are you sure?"
        description="This will reset the cache."
        handleClose={handleClose}
      />
      {error && <Alert severity="error">{error.message}</Alert>}
      {data && data.status && (
        <Alert severity="success">
          <CustomTypography color="textSecondary" variant="body1">
            {data.message}
          </CustomTypography>
        </Alert>
      )}
    </Box>
  )
}
